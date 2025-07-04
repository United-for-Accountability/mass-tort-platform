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

  const handleSubmit = () => {
    if (!story.trim()) {
      alert('Please enter or generate a story first.');
      return;
    }

    // Placeholder for future Airtable/API connection
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
              This is your space to tell the truth. If you're not sure how to start, choose one of the following options:
            </p>

            {!mode && (
              <div className="space-y-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => setMode('guided')}
                >
                  ✍️ Let the Assistant Guide Me
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
              <div className="mt-6">
                <StoryAIHelper onComplete={(generatedStory) => setStory(generatedStory)} />
              </div>
            )}

            {mode === 'guided' && (
              <div className="mt-6">
                <GuidedStoryHelper onComplete={(generatedStory) => setStory(generatedStory)} />
              </div>
            )}

            {story && !submitted && (
              <div className="mt-6 text-right">
                <button
                  className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 font-semibold"
                  onClick={handleSubmit}
                >
                  🖊 Submit My Story
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
