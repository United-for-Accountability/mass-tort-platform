import { logServerFailure } from '../../../../../../lib/serverLogging.mjs';
import { isDocumentId, isOptionalText } from '../../../../../../lib/adminValidation.mjs';
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
  if (!isDocumentId(submissionId)) {
    return res.status(400).json({ error: 'Submission ID is required.' });
  }

  const { verification_status, counted_toward_threshold, review_note } = req.body ?? {};

  if (!verification_status || !validVerificationStatuses.includes(verification_status)) {
    return res.status(400).json({ error: 'Invalid verification status.' });
  }

  if ((counted_toward_threshold !== undefined && typeof counted_toward_threshold !== 'boolean') || !isOptionalText(review_note, 4000)) {
    return res.status(400).json({ error: 'Invalid count flag or review note.' });
  }
  const counted = verification_status === 'verified' && counted_toward_threshold === true;

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
    logServerFailure('Error updating People\'s Last Resort submission:', error);
    return res.status(500).json({ error: 'Unable to update submission.' });
  }
}