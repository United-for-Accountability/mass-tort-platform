import { createHash, randomBytes } from 'node:crypto';
import { isIP } from 'node:net';

const CASE_API = '/api/cases/peoples-last-resort';
const CHAT_PATHS = new Set(['/api/ai', '/api/story-guide', '/api/story-helper', '/api/ask']);

export function routePolicy(pathname) {
  if (CHAT_PATHS.has(pathname)) return { methods: ['POST'], group: 'assistant', limit: 30, maxBytes: 64 * 1024 };
  if (pathname === '/api/save-to-airtable' || pathname === `${CASE_API}/submit`) {
    return { methods: ['POST'], group: 'submissions', limit: 10, maxBytes: 64 * 1024 };
  }
  if (pathname === '/api/submit') return { methods: ['POST'], group: 'submissions', limit: 10, multipart: true, maxBytes: 11 * 1024 * 1024 };
  if (pathname === `${CASE_API}/status`) return { methods: ['GET'], group: 'status', limit: 60 };
  if (pathname === `${CASE_API}/admin/state`) return { methods: ['GET', 'PUT'], group: 'admin', limit: 60, maxBytes: 16 * 1024 };
  if (pathname === `${CASE_API}/admin/submissions` || pathname === `${CASE_API}/admin/export`) {
    return { methods: ['GET'], group: 'admin', limit: 60 };
  }
  if (new RegExp(`^${CASE_API}/admin/submissions/[^/]+$`).test(pathname)) {
    return { methods: ['PATCH'], group: 'admin', limit: 60, maxBytes: 16 * 1024 };
  }
  return null;
}

// Supplemental protection per process. A distributed firewall limit is still needed
// across serverless instances/regions. Fixed memory bound and no raw IP retention.
export function createRateLimiter({ now = Date.now, capacity = 10000, windowMs = 60000 } = {}) {
  const entries = new Map();
  const salt = randomBytes(32);
  let sweepAt = 0;
  return (identity, group, limit) => {
    const timestamp = now();
    if (timestamp >= sweepAt) {
      for (const [key, row] of entries) if (row.resetAt <= timestamp) entries.delete(key);
      sweepAt = timestamp + windowMs;
    }
    const key = createHash('sha256').update(salt).update(`${group}:${identity}`).digest('hex');
    let row = entries.get(key);
    if (!row || row.resetAt <= timestamp) {
      if (!row && entries.size >= capacity) return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };
      row = { count: 0, resetAt: timestamp + windowMs };
      entries.set(key, row);
    }
    row.count += 1;
    return { allowed: row.count <= limit, retryAfter: Math.max(1, Math.ceil((row.resetAt - timestamp) / 1000)) };
  };
}

export function clientIdentity(headers, onVercel = process.env.VERCEL === '1') {
  // Only trust the IP header when the hosting platform overwrites it.
  const ip = onVercel ? headers.get('x-forwarded-for')?.split(',')[0].trim() : '';
  return ip && isIP(ip) ? ip : 'shared-untrusted-proxy';
}

function parsePublicOrigin(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
        url.pathname !== '/' || url.search || url.hash) return null;
    return url.origin;
  } catch { return null; }
}

export function publicRequestOrigin(request, {
  publicOrigin = process.env.APP_PUBLIC_ORIGIN,
  onVercel = process.env.VERCEL === '1',
  trustProxyHeaders = process.env.TRUST_PROXY_HEADERS === '1',
} = {}) {
  // A fixed origin is preferred when a reverse proxy terminates TLS or rewrites Host.
  if (publicOrigin !== undefined) return parsePublicOrigin(publicOrigin);
  const url = new URL(request.url);
  const trustForwarded = onVercel || trustProxyHeaders;
  const host = (trustForwarded ? request.headers.get('x-forwarded-host') : null) ??
    request.headers.get('host') ?? url.host;
  const protocol = (trustForwarded ? request.headers.get('x-forwarded-proto') : null) ?? url.protocol.slice(0, -1);
  // Reject malformed authorities and ambiguous header lists rather than guessing.
  if (!host || /[\s,\/\\?#@]/.test(host) || !['http', 'https'].includes(protocol)) return null;
  return parsePublicOrigin(`${protocol}://${host}`);
}

export function validatePayload(pathname, body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
  if (pathname === '/api/ask') return text(body.question, 8000);
  if (pathname === '/api/story-helper') return text(body.userInput, 20000);
  if (pathname === '/api/ai' || pathname === '/api/story-guide') {
    if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 40) return false;
    let total = 0;
    return body.messages.every((message, index) => {
      if (!message || typeof message !== 'object' || Array.isArray(message)) return false;
      // The existing chat UI sends its initial greeting as a system message.
      const roleAllowed = ['user', 'assistant'].includes(message.role) ||
        (pathname === '/api/ai' && index === 0 && message.role === 'system');
      total += typeof message.content === 'string' ? message.content.length : 0;
      return roleAllowed && text(message.content, 8000) && total <= 32000 &&
        Object.keys(message).every((key) => key === 'role' || key === 'content');
    });
  }
  return true;
}

async function readJson(request, maxBytes) {
  const reader = request.body?.getReader();
  if (!reader) throw { status: 400 };
  const chunks = [];
  let size = 0;
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject({ status: 408 }), 10000);
  });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw { status: 413 };
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } finally {
    clearTimeout(timer);
    // A cloned body can wait on its other reader; do not await cancellation.
    void reader.cancel().catch(() => {});
  }
}

export function createApiGuard({ limiter = createRateLimiter(), onVercel, publicOrigin, trustProxyHeaders } = {}) {
  return async (request) => {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '');
    const policy = routePolicy(pathname);
    if (!policy) return null;
    const error = (status, message, headers = {}) => ({ status, message, headers });
    if (!policy.methods.includes(request.method)) return error(405, 'Method Not Allowed', { Allow: policy.methods.join(', ') });

    const identity = clientIdentity(request.headers, onVercel);
    const quota = limiter(identity, policy.group, policy.limit);
    if (!quota.allowed) return error(429, 'Too many requests. Please try again shortly.', { 'Retry-After': String(quota.retryAfter) });

    if (request.method === 'GET') return null;
    const origin = request.headers.get('origin');
    const fetchSite = request.headers.get('sec-fetch-site');
    const expectedOrigin = publicRequestOrigin(request, { onVercel, publicOrigin, trustProxyHeaders });
    if (fetchSite === 'cross-site' || (origin && origin !== expectedOrigin)) return error(403, 'Cross-site requests are not allowed.');
    const contentType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (policy.multipart ? contentType !== 'multipart/form-data' : contentType !== 'application/json') {
      return error(415, 'Unsupported content type.');
    }
    const length = request.headers.get('content-length');
    if (length !== null && (!/^\d+$/.test(length) || Number(length) > policy.maxBytes)) return error(413, 'Request body is too large.');
    if (policy.multipart) return null; // Formidable enforces actual streamed file/field limits.
    try {
      const body = await readJson(request, policy.maxBytes);
      if (!validatePayload(pathname, body)) return error(400, 'Invalid request payload.');
    } catch (failure) {
      const status = [408, 413].includes(failure?.status) ? failure.status : 400;
      return error(status, status === 413 ? 'Request body is too large.' : 'Invalid or incomplete request body.');
    }
    return null;
  };
}
