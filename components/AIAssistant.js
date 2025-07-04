import { useState } from 'react';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: "Hi there. I’m here to help explain your rights, answer questions about this platform, and support your story submission. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-blue-700 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-800 z-50"
        onClick={() => setOpen(!open)}
      >
        💬 Ask Accountability
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-80 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col z-50">
          <div className="p-3 border-b font-semibold bg-blue-600 text-white">Ask Accountability</div>
          <div className="p-3 h-64 overflow-y-auto text-sm space-y-2">
            {messages.slice(1).map((msg, i) => (
              <div key={i} className={`text-${msg.role === 'user' ? 'right' : 'left'}`}>
                <p className={`px-3 py-2 rounded-lg inline-block ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {msg.content}
                </p>
              </div>
            ))}
            {loading && <p className="text-gray-500 italic">Thinking…</p>}
          </div>
          <div className="flex border-t">
            <input
              type="text"
              className="flex-grow px-2 py-1 text-sm outline-none"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="px-3 bg-blue-600 text-white text-sm">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}