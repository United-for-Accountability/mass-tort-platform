export default async function handler(req, res) {
  const { summary, submitted } = req.body;

  try {
    const airtableRes = await fetch('https://api.airtable.com/v0/appRXApRxJuBx9dHB/Table%201', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          "Combined Summary": summary,
          "Submitted": submitted
        }
      }),
    });

    const result = await airtableRes.json();
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Airtable error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
