import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { Readable } from 'node:stream';

const source = (await readFile(new URL('../pages/api/submit.js', import.meta.url), 'utf8'))
  .replace(/^import[\s\S]*?from '[^']+';\n/gm, '');
const formidablePath = new URL('../node_modules/formidable/src/index.js', import.meta.url).href;
const fixture = await import('data:text/javascript,' + encodeURIComponent(`
  import formidable from ${JSON.stringify(formidablePath)};
  import crypto from 'node:crypto';
  import path from 'node:path';
  import os from 'node:os';
  import * as fsPromises from 'node:fs/promises';
  export const directories = [];
  export const uploads = [];
  export const writes = [];
  const fs = { ...fsPromises, mkdtemp: async (prefix) => {
    const directory = await fsPromises.mkdtemp(prefix);
    directories.push(directory);
    return directory;
  }};
  const verifyRecaptcha = async () => true;
  const logServerFailure = () => {};
  const db = {}, storage = {};
  const collection = () => 'Declarations';
  const addDoc = async (...args) => writes.push(args);
  const serverTimestamp = () => 'timestamp';
  const storageRef = (_storage, objectPath) => objectPath;
  const uploadBytes = async (objectPath, buffer) => uploads.push({ objectPath, content: buffer.toString() });
  const getDownloadURL = async () => 'https://example.invalid/test-file';
  ${source}
`));

function multipart(content, type = 'application/pdf') {
  const boundary = 'test-authority-boundary';
  const fields = { sign_for: 'minor', authority_type: 'Legal Guardian', consent_checked: 'true', signature_name: 'Test' };
  let body = '';
  for (const [name, value] of Object.entries(fields)) {
    body += `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`;
  }
  body += `--${boundary}\r\nContent-Disposition: form-data; name="authority_file"; filename="../../private.pdf"\r\nContent-Type: ${type}\r\n\r\n${content}\r\n--${boundary}--\r\n`;
  const req = Readable.from([Buffer.from(body)]);
  req.method = 'POST';
  req.headers = { 'content-type': `multipart/form-data; boundary=${boundary}`, 'content-length': String(Buffer.byteLength(body)) };
  req.socket = { remoteAddress: '203.0.113.1' };
  return req;
}
const response = () => ({ status(code) { this.code = code; return this; }, json(body) { this.body = body; } });

test('real multipart parser uses generated filenames and cleans its private directory after successful writes', async () => {
  const res = response();
  await fixture.default(multipart('%PDF-test-document'), res);
  assert.equal(res.code, 200);
  assert.equal(fixture.writes.length, 1);
  assert.equal(fixture.uploads[0].content, '%PDF-test-document');
  assert.match(fixture.uploads[0].objectPath, /^authority\/[a-f0-9-]{36}\.pdf$/);
  await assert.rejects(access(fixture.directories.at(-1)), { code: 'ENOENT' });
});

test('disguised authority files are rejected and temporary directories are cleaned on failure', async () => {
  const before = fixture.writes.length;
  const res = response();
  await fixture.default(multipart('<script>bad</script>'), res);
  assert.equal(res.code, 400);
  assert.equal(fixture.writes.length, before);
  await assert.rejects(access(fixture.directories.at(-1)), { code: 'ENOENT' });
});
