// pages/sign.js
import Head from 'next/head';
import { useState } from 'react';

export default function Sign() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Future: send to backend or Airtable
  };

  return (
    <>
      <Head>
        <title>Sign the Declaration | United for Accountability</title>
      </Head>
      <main className="min-h-screen bg-white text-gray-900 px-6 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📜 Add Your Name to the Case File</h1>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded shadow">
            Thank you. Your signature has been recorded. Every name matters.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name <span className="text-red-600">*</span></label>
              <input type="text" required className="w-full border px-4 py-2 rounded" />
            </div>

            <div>
              <label className="block font-semibold mb-1">State</label>
              <input type="text" className="w-full border px-4 py-2 rounded" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email (for updates)</label>
              <input type="email" className="w-full border px-4 py-2 rounded" />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <label>
                I affirm I have experienced or witnessed harm under unjust policies and systems.
              </label>
            </div>

            <div>
              <label className="block font-semibold mb-1">Your Story (optional)</label>
              <textarea rows={5} className="w-full border px-4 py-2 rounded resize-none" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              🖊 Sign the Declaration
            </button>
          </form>
        )}
      </main>
    </>
  );
}
