export default async function handler(req, res) {
  const { summary, submitted } = req.body;
  const airtableToken = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID || 'appRXApRxJuBx9dHB';
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'Table 1';

  if (!airtableToken) {
    res.status(500).json({ success: false, error: 'Missing Airtable token configuration.' });
    return;
  }

  try {
    const airtableRes = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${airtableToken}`,
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
    if (!airtableRes.ok) {
      res.status(airtableRes.status).json({ success: false, result });
      return;
    }

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Airtable error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
