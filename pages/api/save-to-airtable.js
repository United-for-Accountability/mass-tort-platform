import { logServerFailure } from '../../lib/serverLogging.mjs';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
  const { summary, submitted } = req.body ?? {};
  if (typeof summary !== 'string' || !summary.trim() || summary.length > 20000 || typeof submitted !== 'boolean') {
    return res.status(400).json({ success: false, error: 'A summary and boolean submitted value are required.' });
  }
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
      signal: AbortSignal.timeout(10000),
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

    await airtableRes.json();
    if (!airtableRes.ok) {
      res.status(502).json({ success: false, error: 'Unable to save submission.' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    logServerFailure("Airtable error:", err);
    res.status(500).json({ success: false, error: 'Unable to save submission.' });
  }
}
