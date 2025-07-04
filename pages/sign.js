import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import StoryAIHelper from '../components/StoryAIHelper';
import GuidedStoryHelper from '../components/GuidedStoryHelper';

export default function Sign() {
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState(''); // '' | 'ai' | 'guided'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    age: '',
    gender: '',
    race: '',
    consentToUse: true,
    canContact: true,
    contactMethod: 'email',
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!story.trim() || !formData.name || !formData.email) {
      alert('Please complete the story and required fields.');
      return;
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, story }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Submission Error:', err);
      alert('Something went wrong submitting your story. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Sign the Declaration | United for Accountability</title>
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 text-gray-900 grid md:grid-cols-2 gap-10">
        {submitted ? (
          <div className="md:col-span-2 bg-green-100 text-green-800 p-6 rounded shadow text-center">
            ✅ Thank you. Your story and information have been submitted.
          </div>
        ) : (
          <>
            {/* LEFT COLUMN: STORY ASSISTANT */}
            <div>
              <h2 className="text-xl font-bold mb-4">✍️ Tell Your Story</h2>
              <p className="text-sm text-gray-600 mb-4">
                This is your space to tell the truth. Choose how you want to begin.
              </p>

              {!mode && (
                <div className="space-y-3">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setMode('guided')}
                  >
                    🤖 Let Ask Accountability Guide Me
                  </button>
                  <button
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setMode('ai')}
                  >
                    ⚡ Write with AI Help
                  </button>
                </div>
              )}

              {mode === 'ai' && (
                <div className="mt-4">
                  <StoryAIHelper onComplete={(generatedStory) => setStory(generatedStory)} />
                </div>
              )}

              {mode === 'guided' && (
                <div className="mt-4">
                  <GuidedStoryHelper onComplete={(generatedStory) => setStory(generatedStory)} />
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: FORM */}
            <div>
              <h2 className="text-xl font-bold mb-4">📋 Your Information</h2>

              <div className="space-y-4">
                {[
                  { label: 'Name', name: 'name' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Phone Number', name: 'phone' },
                  { label: 'City', name: 'city' },
                  { label: 'State', name: 'state' },
                  { label: 'ZIP Code', name: 'zip' },
                  { label: 'Age', name: 'age' },
                  { label: 'Gender', name: 'gender' },
                  { label: 'Race / Ethnicity', name: 'race' },
                ].map(({ label, name, type = 'text' }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="consentToUse"
                    checked={formData.consentToUse}
                    onChange={handleChange}
                  />
                  <label className="text-sm">
                    I consent to my story being used (anonymously or publicly).
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="canContact"
                    checked={formData.canContact}
                    onChange={handleChange}
                  />
                  <label className="text-sm">
                    You may contact me about the legal action / mass tort.
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium">Preferred Contact Method</label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                {story && (
                  <button
                    className="mt-6 w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-semibold"
                    onClick={handleSubmit}
                  >
                    🖊 Submit My Story & Information
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
