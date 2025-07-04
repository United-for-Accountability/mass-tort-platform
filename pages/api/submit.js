// pages/api/submit.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    name,
    email,
    phone,
    city,
    state,
    zip,
    age,
    gender,
    race,
    story,
    consentToUse,
    canContact,
    contactMethod,
  } = req.body;

  try {
    const airtableRes = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          "Phone Number": phone,
          City: city,
          State: state,
          "ZIP Code": zip,
          Age: age,
          Gender: gender,
          "Race/Ethnicity": race,
          "Declaration of Harm": story,
          "Consent for Use": consentToUse,
          "Okay to Contact About Tort": canContact,
          "Preferred Contact Method": contactMethod,
          "Date Signed": new Date().toISOString().split('T')[0],
        }
      }),
    });

    const result = await airtableRes.json();

    if (!airtableRes.ok) {
      console.error('❌ Airtable error:', result);
      return res.status(500).json({ error: 'Failed to save to Airtable.' });
    }

    return res.status(200).json({ success: true, record: result });
  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
