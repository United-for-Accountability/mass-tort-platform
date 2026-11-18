import { logServerFailure } from '../../../../lib/serverLogging.mjs';
import {
  getPeoplesLastResortState,
  mergePeoplesLastResortCaseState,
  peoplesLastResortCase
} from '../../../../data/contingentCases';
import { collection, doc, getDoc, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

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
    // Count on the server; public status requests never download private testimony.
    const [all, verified, rejected] = await Promise.all([
      getCountFromServer(submissionsRef),
      getCountFromServer(query(submissionsRef, where('verification_status', '==', 'verified'), where('counted_toward_threshold', '==', true))),
      getCountFromServer(query(submissionsRef, where('verification_status', '==', 'rejected'))),
    ]);
    const verificationSummary = {
      rawSubmissionCount: all.data().count,
      verifiedCount: verified.data().count,
      rejectedCount: rejected.data().count,
      pendingCount: Math.max(0, all.data().count - verified.data().count - rejected.data().count),
    };

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
    logServerFailure('Error loading People\'s Last Resort status:', error);
    return res.status(500).json({ error: 'Unable to load case status.' });
  }
}