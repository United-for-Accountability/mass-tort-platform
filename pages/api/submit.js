import crypto from 'crypto';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const verifyRecaptcha = async (token) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return data.success;
};

function canonicalizeForHash(payload) {
  const signed = {
    firstName: payload.firstName?.trim(),
    lastName: payload.lastName?.trim(),
    email: payload.email?.toLowerCase().trim(),
    phone: payload.phone?.trim(),
    state: payload.state,
    county: payload.county,
    standingType: payload.standingType,
    harmCategory: (payload.harmCategory || []).sort(),
    harmStatement: payload.harmStatement || '',
    typedSignature: payload.typedSignature?.trim(),
    perjuryDeclaration: !!payload.perjuryDeclaration,
    eSignAcknowledgment: !!payload.eSignAcknowledgment,
    consentToLegalUse: !!payload.consentToLegalUse,
    clientSignedAt: payload.clientSignedAt,
  };
  return JSON.stringify(signed);
}

function sha256(input) {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    city,
    state,
    county,
    zip,
    standingType,
    harmCategory,
    harmStatement,
    consentToLegalUse,
    perjuryDeclaration,
    eSignAcknowledgment,
    typedSignature,
    clientSignedAt,
    token,
  } = req.body;

  const isHuman = await verifyRecaptcha(token);
  if (!isHuman) {
    return res.status(400).json({ error: 'Invalid reCAPTCHA token' });
  }

  if (!firstName || !lastName || !email || !phone || !state || !county || !typedSignature || !consentToLegalUse || !perjuryDeclaration || !eSignAcknowledgment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (standingType === 'direct-harm' && !harmStatement) {
    return res.status(400).json({ error: 'Harm statement required for direct harm' });
  }

  const canonical = canonicalizeForHash(req.body);
  const submissionHash = sha256(canonical);
  const now = new Date().toISOString();
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  try {
    await addDoc(collection(db, 'Declarations'), {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      city,
      state,
      county,
      zip,
      standingType,
      harmCategory: harmCategory || [],
      harmStatement: harmStatement || '',
      consentToLegalUse: !!consentToLegalUse,
      perjuryDeclaration: !!perjuryDeclaration,
      eSignAcknowledgment: !!eSignAcknowledgment,
      typedSignature,
      clientSignedAt,
      serverReceivedAt: now,
      serverTimezone: 'UTC',
      ipAddress: ip,
      userAgent,
      submissionHash,
      version: 2,
    });
    res.status(200).json({ success: true, submissionHash });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
