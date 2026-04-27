import {
  getPeoplesLastResortState,
  mergePeoplesLastResortCaseState,
  peoplesLastResortCase
} from '../../../../data/contingentCases';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

function summarizeVerification(snapshot) {
  let verifiedCount = 0;
  let pendingCount = 0;
  let rejectedCount = 0;

  snapshot.forEach((submission) => {
    const row = submission.data();

    if (row.verification_status === 'verified' && row.counted_toward_threshold) {
      verifiedCount += 1;
      return;
    }

    if (row.verification_status === 'rejected') {
      rejectedCount += 1;
      return;
    }

    pendingCount += 1;
  });

  return {
    rawSubmissionCount: snapshot.size,
    verifiedCount,
    pendingCount,
    rejectedCount,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const stateRef = doc(
      db,
      peoplesLastResortCase.stateCollectionName,
      peoplesLastResortCase.stateDocumentId
    );
    const statusDoc = await getDoc(stateRef);
    const statusData = statusDoc.exists() ? statusDoc.data() : {};

    const submissionsRef = collection(db, peoplesLastResortCase.collectionName);
    const submissionsSnapshot = await getDocs(submissionsRef);
    const verificationSummary = summarizeVerification(submissionsSnapshot);

    const state = getPeoplesLastResortState(
      mergePeoplesLastResortCaseState({
        ...statusData,
        ...verificationSummary,
      })
    );

    return res.status(200).json({
      slug: state.slug,
      title: state.title,
      status: state.status,
      activationMode: state.activationMode,
      thresholdType: state.thresholdType,
      thresholdValue: state.thresholdValue,
      verifiedCount: state.verifiedCount,
      rawSubmissionCount: state.rawSubmissionCount,
      pendingCount: state.pendingCount,
      rejectedCount: state.rejectedCount,
      thresholdConfigured: state.thresholdConfigured,
      thresholdMet: state.thresholdMet,
      thresholdRatio: state.thresholdRatio,
      thresholdRemaining: state.thresholdRemaining,
      courtOutcome: state.courtOutcome,
      deniedByCourt: state.deniedByCourt,
      showPostDenialNotice: state.showPostDenialNotice,
      publicBenchmarkLabel: state.publicBenchmarkLabel,
      explanatoryNotice: state.explanatoryNotice,
      verificationStandard: state.verificationStandard,
      updatedAt: statusData.updatedAt ?? null,
    });
  } catch (error) {
    console.error('Error loading People\'s Last Resort status:', error);
    return res.status(500).json({ error: 'Unable to load case status.' });
  }
}