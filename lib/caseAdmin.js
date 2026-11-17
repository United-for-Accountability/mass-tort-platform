import { logServerFailure } from './serverLogging.mjs';
import { tokensMatch } from './security.mjs';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export function getAdminTokenFromRequest(req) {
  const authorization = req.headers.authorization;
  const bearerToken = typeof authorization === 'string' && /^Bearer /i.test(authorization)
    ? authorization.slice(7).trim() : '';
  return bearerToken || req.headers['x-admin-token'] || '';
}

export function assertAdminAuthorized(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const expectedToken = process.env.CASE_ADMIN_TOKEN;
  if (!expectedToken) {
    res.status(500).json({ error: 'CASE_ADMIN_TOKEN is not configured.' });
    return false;
  }

  const suppliedToken = getAdminTokenFromRequest(req);
  if (!tokensMatch(suppliedToken, expectedToken)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return false;
  }

  return true;
}

function getClientIp(req) {
  const forwarded = (req.headers['x-forwarded-for'] || '').toString();
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || '';
}

export async function writeCaseAuditLog({
  caseSlug,
  action,
  actor,
  req,
  details,
}) {
  if (!caseSlug || !action) {
    return;
  }

  try {
    await addDoc(collection(db, 'CaseAuditLogs'), {
      caseSlug,
      action,
      actor: (actor || req.headers['x-admin-actor'] || 'admin').toString().trim(),
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || '',
      details: details || {},
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    logServerFailure('Unable to write case audit log:', error);
  }
}
