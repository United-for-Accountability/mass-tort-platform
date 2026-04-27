import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  getPeoplesLastResortState,
  mergePeoplesLastResortCaseState,
  peoplesLastResortCase,
  validCaseStatuses,
  validCourtOutcomes,
} from '../../../../../data/contingentCases';
import { db } from '../../../../../lib/firebase';
import { assertAdminAuthorized, writeCaseAuditLog } from '../../../../../lib/caseAdmin';

function parseThresholdValue(value) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const threshold = Number(value);
  if (!Number.isFinite(threshold) || threshold <= 0) {
    return null;
  }

  return Math.floor(threshold);
}

export default async function handler(req, res) {
  if (!assertAdminAuthorized(req, res)) {
    return;
  }

  const stateRef = doc(db, peoplesLastResortCase.stateCollectionName, peoplesLastResortCase.stateDocumentId);

  try {
    if (req.method === 'GET') {
      const statusDoc = await getDoc(stateRef);
      const statusData = statusDoc.exists() ? statusDoc.data() : {};
      const state = getPeoplesLastResortState(mergePeoplesLastResortCaseState(statusData));
      return res.status(200).json({ state });
    }

    if (req.method === 'PUT') {
      const {
        status,
        thresholdValue,
        courtOutcome,
        publicBenchmarkLabel,
        explanatoryNotice,
      } = req.body ?? {};

      if (status && !validCaseStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid case status.' });
      }

      if (courtOutcome && !validCourtOutcomes.includes(courtOutcome)) {
        return res.status(400).json({ error: 'Invalid court outcome.' });
      }

      const updates = {
        updatedAt: serverTimestamp(),
      };

      if (status) {
        updates.status = status;
      }

      if (courtOutcome) {
        updates.courtOutcome = courtOutcome;
      }

      if (publicBenchmarkLabel !== undefined) {
        updates.publicBenchmarkLabel = (publicBenchmarkLabel ?? '').toString().trim();
      }

      if (explanatoryNotice !== undefined) {
        updates.explanatoryNotice = (explanatoryNotice ?? '').toString().trim();
      }

      if (thresholdValue !== undefined) {
        updates.thresholdValue = parseThresholdValue(thresholdValue);
      }

      await setDoc(stateRef, updates, { merge: true });

      await writeCaseAuditLog({
        caseSlug: peoplesLastResortCase.slug,
        action: 'case-state-updated',
        req,
        details: {
          status: updates.status ?? null,
          courtOutcome: updates.courtOutcome ?? null,
          thresholdValue: updates.thresholdValue ?? null,
          publicBenchmarkLabelUpdated: Object.prototype.hasOwnProperty.call(updates, 'publicBenchmarkLabel'),
          explanatoryNoticeUpdated: Object.prototype.hasOwnProperty.call(updates, 'explanatoryNotice'),
        },
      });

      const updatedDoc = await getDoc(stateRef);
      const updatedData = updatedDoc.exists() ? updatedDoc.data() : {};
      const state = getPeoplesLastResortState(mergePeoplesLastResortCaseState(updatedData));
      return res.status(200).json({ ok: true, state });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error managing People\'s Last Resort state:', error);
    return res.status(500).json({ error: 'Unable to manage case state.' });
  }
}