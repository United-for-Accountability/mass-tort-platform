import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const verificationStatuses = ['pending-review', 'verified', 'needs-more-info', 'rejected'];
const caseStatuses = ['contingent-collection', 'threshold-met-awaiting-denial', 'post-denial-active'];
const courtOutcomes = ['not-filed', 'pending', 'dismissed', 'denied', 'granted', 'settled'];

export default function PeoplesLastResortAdminPage() {
  const [adminToken, setAdminToken] = useState('');
  const [adminActor, setAdminActor] = useState('');
  const [state, setState] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMoreSubmissions, setHasMoreSubmissions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingState, setSavingState] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [draftState, setDraftState] = useState({
    status: 'contingent-collection',
    thresholdValue: '',
    courtOutcome: 'not-filed',
    publicBenchmarkLabel: '',
    explanatoryNotice: '',
  });

  const getAdminHeaders = () => {
    const headers = { 'x-admin-token': adminToken.trim() };
    if (adminActor.trim()) {
      headers['x-admin-actor'] = adminActor.trim();
    }
    return headers;
  };

  const loadData = async () => {
    if (!adminToken.trim()) {
      setErrorMessage('Enter the admin token first.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const headers = getAdminHeaders();

      const [stateResponse, submissionsResponse] = await Promise.all([
        fetch('/api/cases/peoples-last-resort/admin/state', { headers }),
        fetch('/api/cases/peoples-last-resort/admin/submissions?pageSize=50', { headers }),
      ]);

      const statePayload = await stateResponse.json();
      const submissionsPayload = await submissionsResponse.json();

      if (!stateResponse.ok) {
        throw new Error(statePayload.error || 'Unable to load admin state.');
      }

      if (!submissionsResponse.ok) {
        throw new Error(submissionsPayload.error || 'Unable to load submissions.');
      }

      setState(statePayload.state);
      setSubmissions(submissionsPayload.submissions);
      setNextCursor(submissionsPayload.nextCursor || null);
      setHasMoreSubmissions(Boolean(submissionsPayload.hasMore));
      setDraftState({
        status: statePayload.state.status || 'contingent-collection',
        thresholdValue: statePayload.state.thresholdValue == null ? '' : statePayload.state.thresholdValue,
        courtOutcome: statePayload.state.courtOutcome || 'not-filed',
        publicBenchmarkLabel: statePayload.state.publicBenchmarkLabel || '',
        explanatoryNotice: statePayload.state.explanatoryNotice || '',
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSubmissions = async () => {
    if (!adminToken.trim()) {
      setErrorMessage('Enter the admin token first.');
      return;
    }

    if (!nextCursor) {
      return;
    }

    setLoadingMore(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/cases/peoples-last-resort/admin/submissions?pageSize=50&cursor=${encodeURIComponent(nextCursor)}`, {
        headers: getAdminHeaders(),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to load more submissions.');
      }

      setSubmissions((prev) => [...prev, ...payload.submissions]);
      setNextCursor(payload.nextCursor || null);
      setHasMoreSubmissions(Boolean(payload.hasMore));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to load more submissions.');
    } finally {
      setLoadingMore(false);
    }
  };

  const exportVerifiedCsv = async () => {
    if (!adminToken.trim()) {
      setErrorMessage('Enter the admin token first.');
      return;
    }

    setExporting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/cases/peoples-last-resort/admin/export', {
        headers: getAdminHeaders(),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Unable to export verified submissions.');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition') || '';
      const match = contentDisposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] || 'peoples-last-resort-verified.csv';

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to export verified submissions.');
    } finally {
      setExporting(false);
    }
  };

  const saveState = async () => {
    if (!adminToken.trim()) {
      setErrorMessage('Enter the admin token first.');
      return;
    }

    setErrorMessage('');
    setSavingState(true);

    try {
      const response = await fetch('/api/cases/peoples-last-resort/admin/state', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders(),
        },
        body: JSON.stringify(draftState),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save state.');
      }

      setState(payload.state);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to save state.');
    } finally {
      setSavingState(false);
    }
  };

  const updateSubmission = async (submissionId, verification_status, counted_toward_threshold) => {
    if (!adminToken.trim()) {
      setErrorMessage('Enter the admin token first.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch(`/api/cases/peoples-last-resort/admin/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders(),
        },
        body: JSON.stringify({ verification_status, counted_toward_threshold }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to update submission.');
      }

      setSubmissions((prev) =>
        prev.map((entry) =>
          entry.id === submissionId
            ? {
                ...entry,
                verification_status,
                counted_toward_threshold: verification_status === 'verified' ? counted_toward_threshold : false,
              }
            : entry
        )
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to update submission.');
    }
  };

  return (
    <>
      <Head>
        <title>The People&apos;s Last Resort Admin | United for Accountability</title>
        <meta name="description" content="Administrative controls for verification, threshold, and court outcome state for The People's Last Resort case." />
      </Head>

      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 text-slate-900">
        <section className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">The People&apos;s Last Resort Admin</h1>
          <p className="mt-3 text-sm text-slate-600">Use this panel to manage verification statuses, threshold configuration, and court-outcome triggers. Access requires CASE_ADMIN_TOKEN.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <input
              type="password"
              value={adminToken}
              onChange={(event) => setAdminToken(event.target.value)}
              className="w-full max-w-md rounded-md border border-slate-300 px-3 py-2"
              placeholder="Enter admin token"
            />
            <input
              type="text"
              value={adminActor}
              onChange={(event) => setAdminActor(event.target.value)}
              className="w-full max-w-sm rounded-md border border-slate-300 px-3 py-2"
              placeholder="Admin actor name (for audit log)"
            />
            <button type="button" onClick={loadData} disabled={loading} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-500">
              {loading ? 'Loading...' : 'Load admin data'}
            </button>
            <button type="button" onClick={exportVerifiedCsv} disabled={exporting || !state} className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-emerald-400">
              {exporting ? 'Exporting...' : 'Export verified CSV'}
            </button>
          </div>

          {errorMessage && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</p>}
        </section>

        {state && (
          <section className="mt-8 rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Case state controls</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold">Case status</span>
                <select
                  value={draftState.status}
                  onChange={(event) => setDraftState((prev) => ({ ...prev, status: event.target.value }))}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2"
                >
                  {caseStatuses.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 text-sm">
                <span className="font-semibold">Court outcome</span>
                <select
                  value={draftState.courtOutcome}
                  onChange={(event) => setDraftState((prev) => ({ ...prev, courtOutcome: event.target.value }))}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2"
                >
                  {courtOutcomes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 text-sm">
                <span className="font-semibold">Threshold value</span>
                <input
                  type="number"
                  value={draftState.thresholdValue}
                  onChange={(event) => setDraftState((prev) => ({ ...prev, thresholdValue: event.target.value }))}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2"
                  placeholder="Set verified majority benchmark"
                />
              </label>

              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-semibold">Benchmark label</span>
                <input
                  type="text"
                  value={draftState.publicBenchmarkLabel}
                  onChange={(event) => setDraftState((prev) => ({ ...prev, publicBenchmarkLabel: event.target.value }))}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-semibold">Explanatory notice</span>
                <textarea
                  rows="3"
                  value={draftState.explanatoryNotice}
                  onChange={(event) => setDraftState((prev) => ({ ...prev, explanatoryNotice: event.target.value }))}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={saveState} disabled={savingState} className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-red-400">
                {savingState ? 'Saving...' : 'Save case state'}
              </button>
              <p className="text-sm text-slate-600">Live summary: {state.verifiedCount} verified / {state.rawSubmissionCount ?? 0} total | threshold met: {state.thresholdMet ? 'yes' : 'no'} | notice unlocked: {state.showPostDenialNotice ? 'yes' : 'no'}</p>
            </div>
          </section>
        )}

        {state && (
          <section className="mt-8 rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Verification queue</h2>
            <p className="mt-2 text-sm text-slate-600">Mark declarations as verified and counted, or reject them. Counts update through the status endpoint.</p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-3">Name</th>
                    <th className="px-3">Email</th>
                    <th className="px-3">Location</th>
                    <th className="px-3">Verification</th>
                    <th className="px-3">Counted</th>
                    <th className="px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((entry) => (
                    <tr key={entry.id} className="rounded-xl bg-slate-50">
                      <td className="px-3 py-2 font-semibold text-slate-900">{entry.fullName || 'Unnamed'}</td>
                      <td className="px-3 py-2">{entry.email || '-'}</td>
                      <td className="px-3 py-2">{entry.location || '-'}</td>
                      <td className="px-3 py-2">{entry.verification_status}</td>
                      <td className="px-3 py-2">{entry.counted_toward_threshold ? 'yes' : 'no'}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => updateSubmission(entry.id, 'verified', true)} className="rounded bg-green-700 px-2 py-1 text-xs font-semibold text-white">Verify + Count</button>
                          <button type="button" onClick={() => updateSubmission(entry.id, 'needs-more-info', false)} className="rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white">Needs info</button>
                          <button type="button" onClick={() => updateSubmission(entry.id, 'rejected', false)} className="rounded bg-red-700 px-2 py-1 text-xs font-semibold text-white">Reject</button>
                          <button type="button" onClick={() => updateSubmission(entry.id, 'pending-review', false)} className="rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-white">Reset pending</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={loadMoreSubmissions} disabled={!hasMoreSubmissions || loadingMore} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-400">
                {loadingMore ? 'Loading more...' : 'Load more submissions'}
              </button>
              <p className="text-sm text-slate-600">
                Showing {submissions.length} submissions{hasMoreSubmissions ? ' (more available)' : ' (end of queue)'}.
              </p>
            </div>

            {submissions.length === 0 && <p className="mt-4 text-sm text-slate-600">No submissions found in the current queue window.</p>}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}