import test from 'node:test';
import assert from 'node:assert/strict';
import { tokensMatch, csvEscape, hasRequiredConsent, verifyRecaptcha } from '../lib/security.mjs';

test('admin tokens reject missing, malformed, and incorrect credentials', () => {
  assert.equal(tokensMatch('secret', 'secret'), true);
  for (const value of ['', undefined, ['secret'], 'wrong', 'secret ']) {
    assert.equal(tokensMatch(value, 'secret'), false);
  }
  assert.equal(tokensMatch('', ''), false);
});

test('CSV export neutralizes formulas, including leading whitespace', () => {
  for (const value of ['=HYPERLINK("https://example.com")', '+1', '-1', '@SUM(1)', '  =1', '\t=1', '\r=1', '\n=1']) {
    assert.ok(csvEscape(value).startsWith('"\''));
  }
  assert.equal(csvEscape('A "quoted", name'), '"A ""quoted"", name"');
  assert.equal(csvEscape(null), '""');
});

test('consent requires actual boolean true values', () => {
  assert.equal(hasRequiredConsent([true, true]), true);
  for (const value of [false, 'false', 'true', 1, {}, null, undefined]) {
    assert.equal(hasRequiredConsent([true, value]), false);
  }
});

test('CAPTCHA safely encodes tokens and fails closed', async () => {
  const originalFetch = globalThis.fetch;
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;
  process.env.RECAPTCHA_SECRET_KEY = 'secret&value';
  try {
    globalThis.fetch = async (_url, options) => {
      assert.equal(options.body.get('secret'), 'secret&value');
      assert.equal(options.body.get('response'), 'token&response=other');
      return { ok: true, json: async () => ({ success: true }) };
    };
    assert.equal(await verifyRecaptcha('token&response=other'), true);
    globalThis.fetch = async () => ({ ok: false });
    assert.equal(await verifyRecaptcha('token'), false);
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: 'false' }) });
    assert.equal(await verifyRecaptcha('token'), false);
    delete process.env.RECAPTCHA_SECRET_KEY;
    assert.equal(await verifyRecaptcha('token'), false);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalSecret === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
    else process.env.RECAPTCHA_SECRET_KEY = originalSecret;
  }
});

test('Airtable endpoint rejects invalid requests before contacting upstream', async () => {
  const { default: handler } = await import('../pages/api/save-to-airtable.js');
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Unexpected upstream request'); };
  const response = () => ({
    headers: {}, setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  });
  try {
    let res = response();
    await handler({ method: 'GET' }, res);
    assert.equal(res.code, 405);
    assert.equal(res.headers.Allow, 'POST');
    for (const body of [undefined, {}, { summary: 'test', submitted: 'false' }, { summary: ' ', submitted: true }]) {
      res = response();
      await handler({ method: 'POST', body }, res);
      assert.equal(res.code, 400);
    }
  } finally { globalThis.fetch = originalFetch; }
});

test('declaration route rejects string consent without writing to Firestore', async () => {
  const { readFile } = await import('node:fs/promises');
  let source = await readFile(new URL('../pages/api/cases/peoples-last-resort/submit.js', import.meta.url), 'utf8');
  source = source.replace(/^import .*;\n/gm, '');
  source = `const verifyRecaptcha = async () => true;
    const hasRequiredConsent = (values) => values.every((value) => value === true);
    const addDoc = () => { throw new Error('Unexpected database write'); };
    const peoplesLastResortCase = {};
    const logServerFailure = () => {};
    ${source}`;
  const { default: handler } = await import('data:text/javascript,' + encodeURIComponent(source));
  const body = {
    token: 'test', fullName: 'Test', email: 'test@example.com', location: 'Test',
    birthYear: '1980', residencyState: 'CA', signature_name: 'Test',
    consent_checked: true, adult_attestation: true, us_connection_attestation: true,
    verification_acknowledgement: true, verification_contact_consent: true,
  };
  for (const field of ['consent_checked', 'adult_attestation', 'us_connection_attestation', 'verification_acknowledgement', 'verification_contact_consent']) {
    const res = { status(code) { this.code = code; return this; }, json(body) { this.body = body; } };
    await handler({ method: 'POST', body: { ...body, [field]: 'false' } }, res);
    assert.equal(res.code, 400);
    assert.match(res.body.error, /consent/);
  }
});
