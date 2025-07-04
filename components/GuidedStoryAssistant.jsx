
import { useState } from 'react';

export default function GuidedStoryAssistant({ onComplete }) {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const prompts = [
    "What happened to you?",
    "Who or what was responsible?",
    "When and where did this happen?",
    "How has this impacted you emotionally or financially?",
    "Why do you believe this happened?",
    "What do you want to see change or achieve through this mass tort?"
  ];

  const handleNext = (response) => {
    setResponses([...responses, response]);
    if (step < prompts.length - 1) {
      setStep(step + 1);
    } else {
      // Generate summary story
      const combined = [...responses, response].join(" ");
      setSummary(combined);
    }
  };

  const handleSubmit = () => {
    if (onComplete) onComplete(summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-green-700 font-medium mt-4">✅ Your story has been saved. Thank you for your voice.</p>;
  }

  return (
    <div className="bg-gray-50 p-4 rounded border shadow space-y-4">
      {summary ? (
        <>
          <h3 className="font-semibold">📝 Review Your Story</h3>
          <p className="whitespace-pre-wrap text-gray-800">{summary}</p>
          <button onClick={handleSubmit} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            ✅ Approve & Submit
          </button>
        </>
      ) : (
        <>
          <p className="font-semibold text-gray-800">Ask Accountability: {prompts[step]}</p>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={4}
            onBlur={(e) => handleNext(e.target.value)}
            placeholder="Type your response here..."
          />
        </>
      )}
    </div>
  );
}
