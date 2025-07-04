// pages/api/submit.ts
// pages/api/submit.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME!;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, state, email, story } = req.body;

  console.log("🚨 Incoming request body:", { name, state, email, story });
  console.log("🔑 Env check:", {
    AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_NAME,
    hasKey: AIRTABLE_API_KEY ? "✅ present" : "❌ missing"
  });

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name || '',
            State: state || '',
            Email: email || '',
            Story: story || '',
          },
        }),
      }
    );

    const data = await airtableRes.json();
    console.log("📦 Airtable response:", data);

    if (!airtableRes.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true, record: data });
  } catch (err: any) {
    console.error("❌ Unexpected error:", err.message || err);
    return res.status(500).json({ error: 'Server error' });
  }
}
