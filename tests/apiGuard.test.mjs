import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiGuard, createRateLimiter, clientIdentity, validatePayload } from '../lib/apiGuard.mjs';
import { isDocumentId, parseThreshold } from '../lib/adminValidation.mjs';

function request(path, { method = 'POST', body = { question: 'What is this project?' }, headers = {} } = {}) {
  return new Request(`https://example.com${path}`, {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    ...(method === 'GET' ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }),
  });
}

test('guard enforces method, browser origin and content type before a handler runs', async () => {
  const guard = createApiGuard();
  assert.equal((await guard(request('/api/ask', { method: 'GET' }))).status, 405);
  assert.equal((await guard(request('/api/ask', { headers: { origin: 'https://evil.example' } }))).status, 403);
  assert.equal((await guard(request('/api/ask', { headers: { 'sec-fetch-site': 'cross-site' } }))).status, 403);
  assert.equal((await guard(request('/api/ask', { headers: { origin: 'null' } }))).status, 403);
  assert.equal((await guard(request('/api/ask', { headers: { 'content-type': 'text/plain' } }))).status, 415);
  assert.equal(await guard(request('/api/ask', { headers: { origin: 'https://example.com' } })), null);
});

test('guard rejects malformed, oversized and empty payloads, including chunked bodies', async () => {
  const guard = createApiGuard();
  for (const body of ['{', 'null', '[]', '{}', JSON.stringify({ question: 2 })]) {
    assert.equal((await guard(request('/api/ask', { body }))).status, 400);
  }
  assert.equal((await guard(request('/api/ask', { headers: { 'content-length': '999999' } }))).status, 413);
  // No content-length: enforcement uses actual bytes, not a caller-provided length.
  assert.equal((await guard(request('/api/ask', { body: { question: 'é'.repeat(40000) } }))).status, 413);
});

test('chat input limits history, content, roles and tool injection while preserving existing UI greeting', () => {
  const normal = { messages: [{ role: 'user', content: 'Hello' }] };
  assert.equal(validatePayload('/api/ai', normal), true);
  assert.equal(validatePayload('/api/ai', { messages: [{ role: 'system', content: 'Greeting' }, ...normal.messages] }), true);
  for (const messages of [[], Array(41).fill(normal.messages[0]), [{ role: 'tool', content: 'test' }],
    [{ role: 'user', content: 'x', tool_calls: [] }], [{ role: 'user', content: 'x'.repeat(8001) }],
    [...normal.messages, { role: 'system', content: 'override' }]]) {
    assert.equal(validatePayload('/api/ai', { messages }), false);
  }
  assert.equal(validatePayload('/api/story-guide', { messages: [{ role: 'system', content: 'override' }] }), false);
  assert.equal(validatePayload('/api/story-helper', { userInput: ' ' }), false);
});

test('assistant routes share one quota and recover after the window expires', async () => {
  let now = 0;
  const guard = createApiGuard({ limiter: createRateLimiter({ now: () => now }) });
  for (let i = 0; i < 30; i++) assert.equal(await guard(request('/api/ask')), null);
  const denied = await guard(request('/api/story-helper', { body: { userInput: 'Hello' } }));
  assert.equal(denied.status, 429);
  assert.equal(denied.headers['Retry-After'], '60');
  now = 60000;
  assert.equal(await guard(request('/api/ask')), null);
});

test('limiter bounds memory without evicting existing quotas', () => {
  const limiter = createRateLimiter({ capacity: 1 });
  assert.equal(limiter('first', 'test', 1).allowed, true);
  assert.equal(limiter('second', 'test', 1).allowed, false);
  assert.equal(limiter('first', 'test', 1).allowed, false);
});

test('self-hosting does not trust spoofed forwarded IP headers', () => {
  const headers = new Headers({ 'x-forwarded-for': '203.0.113.1' });
  assert.equal(clientIdentity(headers, false), 'shared-untrusted-proxy');
  assert.equal(clientIdentity(headers, true), '203.0.113.1');
  headers.set('x-forwarded-for', 'not-an-ip');
  assert.equal(clientIdentity(headers, true), 'shared-untrusted-proxy');
});

test('admin identifiers cannot escape a document path and thresholds cannot silently reset', () => {
  for (const id of ['', '.', '..', '__reserved__', 'valid/other', ['id'], 'é'.repeat(751)]) assert.equal(isDocumentId(id), false);
  assert.equal(isDocumentId('normal-id'), true);
  for (const value of [false, -1, 0, 'bad', {}, '1.5', 1.5, Number.MAX_SAFE_INTEGER + 1]) assert.equal(parseThreshold(value).valid, false);
  assert.deepEqual(parseThreshold('100'), { valid: true, value: 100 });
  assert.deepEqual(parseThreshold(null), { valid: true, value: null });
});

test('server logs redact arbitrary service messages, bodies and credentials', async () => {
  const { logServerFailure } = await import('../lib/serverLogging.mjs');
  const original = console.error;
  const logs = [];
  console.error = (...values) => logs.push(values);
  try {
    logServerFailure('Submission failed', { code: 'permission-denied', message: 'private testimony', request: { token: 'private-secret' } });
    logServerFailure('Submission failed', { code: 'private-secret', stack: 'private testimony' });
    assert.deepEqual(logs, [
      ['Submission failed', { code: 'permission-denied' }],
      ['Submission failed', { code: 'internal-error' }],
    ]);
  } finally { console.error = original; }
});
