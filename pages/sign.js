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
    consentToUse,
    canContact,
    contactMethod,
    story
  } = req.body;

  try {
    const airtableRes = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          Phone: phone,
          City: city,
          State: state,
          ZIP: zip,
          Age: age,
          Gender: gender,
          Race: race,
          ConsentToUse: consentToUse ? 'Yes' : 'No',
          CanContact: canContact ? 'Yes' : 'No',
          ContactMethod: contactMethod,
          Story: story
        }
      })
    });

    const data = await airtableRes.json();

    if (!airtableRes.ok) {
      console.error('🔴 Airtable Error:', data);
      return res.status(500).json({ error: 'Failed to save to Airtable', details: data });
    }

    return res.status(200).json({ success: true, record: data });
  } catch (err) {
    console.error('❌ Submission Server Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
