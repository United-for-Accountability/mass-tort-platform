import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { NextRequest } from 'next/server.js';

const source = (await readFile(new URL('../proxy.js', import.meta.url), 'utf8'))
  .replace("'next/server'", JSON.stringify(new URL('../node_modules/next/server.js', import.meta.url).href))
  .replace("'./lib/apiGuard.mjs'", JSON.stringify(new URL('../lib/apiGuard.mjs', import.meta.url).href));
const { proxy } = await import('data:text/javascript,' + encodeURIComponent(source));

test('Next.js proxy returns compatible non-cacheable errors for every assistant UI', async () => {
  const response = await proxy(new NextRequest('https://example.com/api/ai', { method: 'GET' }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const payload = await response.json();
  for (const key of ['error', 'reply', 'answer', 'draft']) assert.equal(payload[key], 'Method Not Allowed');
});

test('valid JSON survives proxy inspection and reaches a real handler unchanged', async () => {
  const body = { summary: '', submitted: true };
  const request = new NextRequest('https://example.com/api/save-to-airtable', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
  // Next.js buffers the stream for both readers; emulate the router clone here.
  const downstream = request.clone();
  const response = await proxy(request);
  assert.equal(response.headers.get('x-middleware-next'), '1');
  const { default: handler } = await import('../pages/api/save-to-airtable.js');
  const res = { setHeader() {}, status(code) { this.code = code; return this; }, json(value) { this.body = value; } };
  await handler({ method: 'POST', body: await downstream.json() }, res);
  assert.equal(res.code, 400);
  assert.match(res.body.error, /summary/);
});

test('multipart upload passes through proxy without consuming its file stream', async () => {
  const form = new FormData();
  form.set('signature_name', 'Test');
  form.set('authority_file', new Blob(['%PDF-test'], { type: 'application/pdf' }), 'proof.pdf');
  const request = new NextRequest('https://example.com/api/submit', { method: 'POST', body: form });
  const response = await proxy(request);
  assert.equal(response.headers.get('x-middleware-next'), '1');
  assert.equal(request.bodyUsed, false);
  const parsed = await request.formData();
  assert.equal(parsed.get('signature_name'), 'Test');
  assert.equal(await parsed.get('authority_file').text(), '%PDF-test');
});
