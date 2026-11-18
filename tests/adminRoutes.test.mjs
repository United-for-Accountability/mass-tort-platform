import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function mockedRoute(path, extra = '') {
  const source = (await readFile(new URL(path, import.meta.url), 'utf8')).replace(/^import[\s\S]*?from '[^']+';\n/gm, '');
  const validation = new URL('../lib/adminValidation.mjs', import.meta.url).href;
  const cases = new URL('../data/contingentCases.js', import.meta.url).href;
  return import('data:text/javascript,' + encodeURIComponent(`
    import { isDocumentId, isOptionalText, parseThreshold } from ${JSON.stringify(validation)};
    import { peoplesLastResortCase, validVerificationStatuses, validCaseStatuses, validCourtOutcomes,
      getPeoplesLastResortState, mergePeoplesLastResortCaseState } from ${JSON.stringify(cases)};
    export const writes = [];
    const db = {};
    const assertAdminAuthorized = () => true;
    const logServerFailure = () => {};
    const writeCaseAuditLog = async () => {};
    const serverTimestamp = () => 'timestamp';
    const doc = (...parts) => parts;
    const collection = (...parts) => parts;
    const where = (...parts) => parts;
    const query = (...parts) => parts;
    const getDoc = async () => ({ exists: () => true, data: () => ({}) });
    const updateDoc = async (...args) => writes.push(args);
    const setDoc = async (...args) => writes.push(args);
    ${extra}
    ${source}
  `));
}

const response = () => ({ status(code) { this.code = code; return this; }, json(body) { this.body = body; } });

test('admin verification rejects string flags and invalid document paths before writes', async () => {
  const { default: handler, writes } = await mockedRoute('../pages/api/cases/peoples-last-resort/admin/submissions/[submissionId].js');
  for (const [id, body] of [
    ['valid', { verification_status: 'verified', counted_toward_threshold: 'false' }],
    ['escape/other', { verification_status: 'verified', counted_toward_threshold: true }],
    ['valid', { verification_status: 'verified', review_note: {} }],
  ]) {
    const res = response();
    await handler({ method: 'PATCH', query: { submissionId: id }, body }, res);
    assert.equal(res.code, 400);
  }
  assert.equal(writes.length, 0);
  const res = response();
  await handler({ method: 'PATCH', query: { submissionId: 'valid' }, body: { verification_status: 'verified', counted_toward_threshold: false } }, res);
  assert.equal(res.code, 200);
  assert.equal(writes[0][1].counted_toward_threshold, false);
});

test('invalid threshold cannot erase an existing threshold or write malformed notices', async () => {
  const { default: handler, writes } = await mockedRoute('../pages/api/cases/peoples-last-resort/admin/state.js');
  for (const body of [{ thresholdValue: 'oops' }, { thresholdValue: -1 }, { publicBenchmarkLabel: {} }, { explanatoryNotice: 'x'.repeat(4001) }]) {
    const res = response();
    await handler({ method: 'PUT', body }, res);
    assert.equal(res.code, 400);
  }
  assert.equal(writes.length, 0);
});

test('public status uses server aggregate counts without retrieving submission documents', async () => {
  const { default: handler } = await mockedRoute('../pages/api/cases/peoples-last-resort/status.js', `
    const getCountFromServer = async (reference) => {
      const conditions = JSON.stringify(reference);
      const count = conditions.includes('verified') ? 3 : conditions.includes('rejected') ? 1 : 10;
      return { data: () => ({ count }) };
    };
  `);
  const res = response();
  await handler({ method: 'GET' }, res);
  assert.equal(res.code, 200);
  assert.equal(res.body.rawSubmissionCount, 10);
  assert.equal(res.body.verifiedCount, 3);
  assert.equal(res.body.rejectedCount, 1);
  assert.equal(res.body.pendingCount, 6);
  assert.equal('submissions' in res.body, false);
});
