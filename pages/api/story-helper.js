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
            content: "You are a compassionate assistant helping users write personal stories of harm. Use a supportive tone. Do not make assumptions. Stay grounded in what they share."
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