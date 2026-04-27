import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { peoplesLastResortCase, validVerificationStatuses } from '../../../../../../data/contingentCases';
import { db } from '../../../../../../lib/firebase';
import { assertAdminAuthorized, writeCaseAuditLog } from '../../../../../../lib/caseAdmin';

export default async function handler(req, res) {
  if (!assertAdminAuthorized(req, res)) {
    return;
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { submissionId } = req.query;
  if (!submissionId || typeof submissionId !== 'string') {
    return res.status(400).json({ error: 'Submission ID is required.' });
  }

  const { verification_status, counted_toward_threshold, review_note } = req.body ?? {};

  if (!verification_status || !validVerificationStatuses.includes(verification_status)) {
    return res.status(400).json({ error: 'Invalid verification status.' });
  }

  const counted = verification_status === 'verified' ? Boolean(counted_toward_threshold) : false;

  try {
    const submissionRef = doc(db, peoplesLastResortCase.collectionName, submissionId);
    const snapshot = await getDoc(submissionRef);
    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    await updateDoc(submissionRef, {
      verification_status,
      counted_toward_threshold: counted,
      review_note: (review_note ?? '').toString().trim(),
      reviewedAt: serverTimestamp(),
    });

    await writeCaseAuditLog({
      caseSlug: peoplesLastResortCase.slug,
      action: 'submission-verification-updated',
      req,
      details: {
        submissionId,
        verification_status,
        counted_toward_threshold: counted,
      },
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error updating People\'s Last Resort submission:', error);
    return res.status(500).json({ error: 'Unable to update submission.' });
  }
}