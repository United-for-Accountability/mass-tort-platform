export default async function handler(req, res) {
  const { userInput } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a writing assistant helping people draft compelling personal stories of harm for a legal/public platform. Your tone is truthful, empathetic, and powerful. Always respond in the first-person voice. Help transform raw input into a short testimonial that explains what happened, why it matters, and how systems or policies failed them. Do not offer advice or resources. This is not therapy—this is testimony."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.75
      })
    });

    const data = await response.json();
    const draft = data.choices?.[0]?.message?.content || "Sorry, something went wrong creating your story.";

    res.status(200).json({ draft });
  } catch (err) {
    console.error("Story AI error:", err);
    res.status(500).json({ draft: "There was an error. Please try again later." });
  }
}
