export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a compassionate AI interviewer helping someone tell their story of harm for a public mass tort project. Your goal is to gather their testimony in an emotionally supportive way while getting legally relevant facts. Always validate their feelings. Ask one question at a time. Speak like a thoughtful human—not a machine. After each user message, reflect back a bit of empathy and ask a follow-up question until you have what’s needed to draft their full testimony. Do not summarize until they’re done. Begin with: 'Thanks for being here. Can you tell me what happened in your own words?'"
          },
          ...messages
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm here to listen. Can you tell me more?";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Guided AI error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
}