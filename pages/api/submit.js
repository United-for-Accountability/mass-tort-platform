import formidable from 'formidable';
import crypto from 'crypto';
import { promises as fs } from 'fs';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, db, storage } from '../../lib/firebase';

export const config = { api: { bodyParser: false } };

const verifyRecaptcha = async (token) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return data.success;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0] || req.socket.remoteAddress || '';
  const ua = req.headers['user-agent'] || '';

  const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024 });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Invalid form data' });
    try {
      const fd = (k) => (fields[k]?.[0] ?? '').toString().trim();

      const token = fd('token');
      const isHuman = await verifyRecaptcha(token);
      if (!isHuman) return res.status(400).json({ error: 'Invalid reCAPTCHA token' });

      const sign_for = fd('sign_for') || 'self';
      const consent_checked = fd('consent_checked') === 'on' || fd('consent_checked') === 'true';
      const signature_name = fd('signature_name');
      const clientSignedAt = fd('clientSignedAt');
      const harmStatement = fd('harmStatement');
      const harmCategory = fd('harmCategory') ? JSON.parse(fd('harmCategory')) : [];

      if (!consent_checked || !signature_name) return res.status(400).json({ error: 'Consent and signature are required.' });

      // Validation for authority
      let authority_file_url = null;
      const authority_type = fd('authority_type');
      const isMinor = sign_for === 'minor';
      const isIncapacity = sign_for === 'incapacity';

      if (sign_for !== 'self') {
        if (!authority_type) return res.status(400).json({ error: 'Authority type required.' });

        const needsFile =
          (isMinor && authority_type === 'Legal Guardian') ||
          (isIncapacity && ['Power of Attorney', 'Court‑Appointed Conservator/Guardian', 'Healthcare Proxy'].includes(authority_type));

        const attestation = authority_type === 'No formal document – next of kin attestation';

        if (needsFile) {
          const f = files['authority_file'];
          if (!f) return res.status(400).json({ error: 'Proof of authority file required.' });
          const file = f[0];
          const buffer = await fs.readFile(file.filepath);
          const path = `authority/${Date.now()}-${file.originalFilename}`;
          await uploadBytes(storageRef(storage, path), buffer, { contentType: file.mimetype });
          authority_file_url = await getDownloadURL(storageRef(storage, path));
        } else if (attestation) {
          if (!(fd('authority_attestation') === 'on' || fd('authority_attestation') === 'true')) {
            return res.status(400).json({ error: 'Attestation checkbox required.' });
          }
        }
      }

      const signature_date = new Date().toISOString();
      const signature_hash = crypto.createHash('sha256').update(`${signature_name}|${signature_date}|${ip}`).digest('hex');

      await addDoc(collection(db, 'Declarations'), {
        firstName: fd('firstName'),
        lastName: fd('lastName'),
        email: fd('email'),
        phone: fd('phone'),
        addressLine1: fd('addressLine1'),
        city: fd('city'),
        state: fd('state'),
        county: fd('county'),
        zip: fd('zip'),
        standingType: fd('standingType'),
        harmCategory,
        harmStatement: harmStatement || '',
        sign_for,
        signer_fullName: fd('signer_fullName'),
        signer_email: fd('signer_email'),
        signer_phone: fd('signer_phone'),
        relationship_to_person: fd('relationship_to_person'),
        rep_fullName: fd('rep_fullName'),
        rep_dob: fd('rep_dob'),
        rep_city: fd('rep_city'),
        rep_state: fd('rep_state'),
        rep_zip: fd('rep_zip'),
        authority_type,
        authority_file_url,
        authority_attestation: fd('authority_attestation') === 'on' || fd('authority_attestation') === 'true',
        consent_checked,
        consent_version: 'v1.3 – 2025-08-10',
        signature_name,
        signature_drawn_url: null,
        signature_date,
        signature_hash,
        ip_address: ip,
        user_agent: ua,
        clientSignedAt,
        created_at: serverTimestamp(),
      });

      res.status(200).json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Server error' });
    }
  });
}
