import { useState } from "react";

export default function GuidedStoryHelper({ onComplete }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I’m here to help you tell your story. What happened?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    if (onComplete) {
      const userNarrative = newMessages
        .filter((msg) => msg.role === "user")
        .map((msg) => msg.content)
        .join("\n\n");
      onComplete(userNarrative);
    }

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/story-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Guided helper request failed:", err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "I hit a snag. Please try sending that again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-300 rounded p-4 space-y-4 shadow">
      <h2 className="text-lg font-semibold text-gray-800">✍️ Guided Story Assistant</h2>
      <div className="space-y-2 max-h-60 overflow-y-auto text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === "assistant" ? "bg-white text-gray-800" : "bg-blue-100 text-blue-900"}`}>
            <strong>{msg.role === "assistant" ? "Ask Accountability" : "You"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Type your reply..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}