import { useState } from 'react';

export default function AiChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || 'No answer');
    } catch (err) {
      console.error(err);
      setAnswer('Error fetching answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        className="w-full border p-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
      />
      <button className="px-4 py-2 bg-blue-500 text-white" onClick={ask} disabled={loading}>
        {loading ? 'Asking...' : 'Ask'}
      </button>
      {answer && <div className="border p-2">{answer}</div>}
    </div>
  );
}
