import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import StoryAIHelper from '../components/StoryAIHelper';

export default function Sign() {
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!story.trim()) {
      alert('Please enter or generate a story first.');
      return;
    }

    // Placeholder for future submission logic (e.g., API call)
    console.log('Submitted story:', story);
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Sign the Declaration | United for Accountability</title>
      </Head>

      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-12 text-gray-900">
        <h1 className="text-3xl font-bold mb-6">📜 Sign the Declaration</h1>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded shadow">
            ✅ Thank you. Your story has been recorded. Every voice matters.
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-4">
              This is your space to tell the truth. If you're not sure how to start, our AI assistant can help.
            </p>

            <StoryAIHelper onComplete={(generatedStory) => setStory(generatedStory)} />

            <div className="mt-6 text-right">
              <button
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 font-semibold"
                onClick={handleSubmit}
              >
                🖊 Submit My Story
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
