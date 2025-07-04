// pages/sign.js
import Head from 'next/head';
import { useState } from 'react';

export default function Sign() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    state: '',
    email: '',
    story: '',
    affirmed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    console.log("📤 Submitting formData:", formData);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("✅ API response:", result);

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Submission failed:', err);
      setError('Something went wrong.');
    }
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
            ✅ Thank you. Your signature has been recorded. Every name matters.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name *</label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">State</label>
              <input
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email (for updates)</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                name="affirmed"
                type="checkbox"
                required
                checked={formData.affirmed}
                onChange={handleChange}
                className="mt-1"
              />
              <label>
                I affirm I have experienced or witnessed harm under unjust policies and systems.
              </label>
            </div>

            <div>
              <label className="block font-semibold mb-1">Your Story (optional)</label>
              <textarea
                name="story"
                rows={5}
                value={formData.story}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              🖊 Sign the Declaration
            </button>

            {error && (
              <div className="mt-4 text-red-600 font-medium">
                {error}
              </div>
            )}
          </form>
        )}
      </main>
    </>
  );
}
