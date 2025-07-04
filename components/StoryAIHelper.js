import { useState } from 'react';

export default function StoryAIHelper({ onComplete }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch('/api/story-helper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input })
    });
    const data = await res.json();
    setDraft(data.draft);
    setLoading(false);
    onComplete(data.draft);
  };

  return (
    <div className="border p-4 mt-4 rounded bg-gray-50">
      <h3 className="font-semibold mb-2 text-gray-700">🧠 AI Story Helper</h3>
      <p className="text-sm text-gray-600 mb-2">What happened? Share a few words and we'll help turn it into a first draft you can edit.</p>
      <textarea
        rows={3}
        className="w-full border px-3 py-2 rounded text-sm mb-2"
        placeholder="Type a few thoughts or bullet points..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Generate Draft'}
      </button>
      {draft && (
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Your Draft:</label>
          <textarea
            rows={6}
            className="w-full border px-3 py-2 rounded text-sm"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              onComplete(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}