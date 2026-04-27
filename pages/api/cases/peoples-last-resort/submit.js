import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { peoplesLastResortCase } from '../../../../data/contingentCases';

const verifyRecaptcha = async (token) => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const payload = await response.json();
  return payload.success;
};

function cleanString(value) {
  return (value ?? '').toString().trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      token,
      fullName,
      email,
      phone,
      location,
      statement,
      birthYear,
      residencyState,
      verificationMethod,
      verificationReference,
      adult_attestation,
      us_connection_attestation,
      verification_acknowledgement,
      verification_contact_consent,
      consent_checked,
      signature_name,
    } = req.body ?? {};

    if (!token) {
      return res.status(400).json({ error: 'Missing CAPTCHA token.' });
    }

    const isHuman = await verifyRecaptcha(token);
    if (!isHuman) {
      return res.status(400).json({ error: 'Invalid reCAPTCHA token.' });
    }

    const requiredFields = {
      fullName: cleanString(fullName),
      email: cleanString(email),
      location: cleanString(location),
      birthYear: cleanString(birthYear),
      residencyState: cleanString(residencyState),
      signature_name: cleanString(signature_name),
    };

    if (Object.values(requiredFields).some((field) => !field)) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!consent_checked || !adult_attestation || !us_connection_attestation || !verification_acknowledgement || !verification_contact_consent) {
      return res.status(400).json({ error: 'Required attestations and consent were not completed.' });
    }

    const now = new Date();
    const numericBirthYear = Number(requiredFields.birthYear);
    if (!Number.isFinite(numericBirthYear) || numericBirthYear < 1900 || numericBirthYear > now.getUTCFullYear()) {
      return res.status(400).json({ error: 'Birth year is invalid.' });
    }

    const age = now.getUTCFullYear() - numericBirthYear;
    if (age < 18) {
      return res.status(400).json({ error: 'You must be an adult to join this contingent declaration.' });
    }

    const submissionRef = await addDoc(collection(db, peoplesLastResortCase.collectionName), {
      caseSlug: peoplesLastResortCase.slug,
      caseTitle: peoplesLastResortCase.title,
      activationMode: peoplesLastResortCase.activationMode,
      thresholdType: peoplesLastResortCase.thresholdType,
      fullName: requiredFields.fullName,
      email: requiredFields.email,
      phone: cleanString(phone),
      location: requiredFields.location,
      statement: cleanString(statement),
      birthYear: numericBirthYear,
      residencyState: requiredFields.residencyState,
      verificationMethod: cleanString(verificationMethod) || 'manual-review',
      verificationReference: cleanString(verificationReference),
      adult_attestation: Boolean(adult_attestation),
      us_connection_attestation: Boolean(us_connection_attestation),
      verification_acknowledgement: Boolean(verification_acknowledgement),
      verification_contact_consent: Boolean(verification_contact_consent),
      consent_checked: Boolean(consent_checked),
      signature_name: requiredFields.signature_name,
      verification_status: 'pending-review',
      counted_toward_threshold: false,
      review_note: '',
      submittedAt: serverTimestamp(),
      clientSignedAt: now.toISOString(),
    });

    return res.status(200).json({ ok: true, id: submissionRef.id });
  } catch (error) {
    console.error('Error submitting People\'s Last Resort declaration:', error);
    return res.status(500).json({ error: 'Unable to submit declaration.' });
  }
}