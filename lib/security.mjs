import { createHash, timingSafeEqual } from 'node:crypto';

export function tokensMatch(supplied, expected) {
  if (typeof supplied !== 'string' || typeof expected !== 'string' || !supplied || !expected) return false;
  const digest = (value) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(supplied), digest(expected));
}

export function csvEscape(value) {
  let text = String(value ?? '');
  // Quoting alone does not prevent spreadsheet formula execution.
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g, '""') + '"';
}

export function hasRequiredConsent(values) {
  return values.every((value) => value === true);
}

export async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || typeof token !== 'string' || !token || token.length > 4096) return false;
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) return false;
  const payload = await response.json();
  return payload.success === true;
}
