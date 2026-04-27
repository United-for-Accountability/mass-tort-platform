export const peoplesLastResortCase = {
  slug: 'peoples-last-resort',
  title: "The People's Last Resort",
  shortTitle: "People's Last Resort",
  collectionName: 'DeclarationOfPeoplesLastResort',
  stateCollectionName: 'CaseStatus',
  stateDocumentId: 'peoples-last-resort',
  status: 'contingent-collection',
  activationMode: 'verified-majority-and-court-dismissal',
  thresholdType: 'verified-us-adult-majority',
  thresholdValue: null,
  verifiedCount: 0,
  rawSubmissionCount: null,
  pendingCount: 0,
  rejectedCount: 0,
  courtOutcome: 'not-filed',
  publicBenchmarkLabel: 'Verified U.S. adult majority benchmark pending configuration.',
  verificationStandard:
    'Only identity-verified U.S. adults can count toward the majority threshold. Current submissions are collected now and held as contingent declarations until that workflow is finalized.',
  explanatoryNotice:
    'This case is visible now so declarations can be collected, preserved, and organized. It is not presented as a presently ripened majority action unless both the verification threshold and a court dismissal are recorded.',
};

export const ftcaConsentChallengeCase = {
  slug: 'federal-tort-claims-act',
  title: 'Revocation of the Federal Tort Claims Act',
  shortTitle: 'FTCA Consent Challenge',
  collectionName: 'DeclarationOfFTCAMajorityChallenge',
  stateCollectionName: 'CaseStatus',
  stateDocumentId: 'federal-tort-claims-act',
  status: 'contingent-collection',
  activationMode: 'verified-majority-support',
  thresholdType: 'verified-us-adult-majority',
  thresholdValue: null,
  verifiedCount: 0,
  rawSubmissionCount: null,
  pendingCount: 0,
  rejectedCount: 0,
  courtOutcome: 'not-filed',
  publicBenchmarkLabel:
    'Activation requires support exceeding one-half of the U.S. adult population after a verification workflow is established.',
  verificationStandard:
    'Only identity-verified U.S. adults can count toward the majority benchmark. Current submissions preserve support and testimony now, but do not count toward activation until the verification workflow is in place.',
  explanatoryNotice:
    'This case is collecting declarations and support now so the constitutional theory, factual record, and public demand can be assembled for the courts. It is not presented as an already activated majority action unless the verified-majority benchmark is met.',
};

export const validCourtOutcomes = ['not-filed', 'pending', 'dismissed', 'denied', 'granted', 'settled'];
export const validCaseStatuses = ['contingent-collection', 'threshold-met-awaiting-denial', 'post-denial-active'];
export const validVerificationStatuses = ['pending-review', 'verified', 'rejected', 'needs-more-info'];

function coerceThresholdValue(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const threshold = Number(value);
  if (!Number.isFinite(threshold) || threshold <= 0) {
    return null;
  }

  return Math.floor(threshold);
}

function coerceCount(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return 0;
  }

  return Math.floor(numeric);
}

export function mergePeoplesLastResortCaseState(overrides = {}) {
  return {
    ...peoplesLastResortCase,
    ...overrides,
    thresholdValue: coerceThresholdValue(overrides.thresholdValue ?? peoplesLastResortCase.thresholdValue),
    verifiedCount: coerceCount(overrides.verifiedCount ?? peoplesLastResortCase.verifiedCount),
    rawSubmissionCount: overrides.rawSubmissionCount == null ? null : coerceCount(overrides.rawSubmissionCount),
    pendingCount: coerceCount(overrides.pendingCount ?? peoplesLastResortCase.pendingCount),
    rejectedCount: coerceCount(overrides.rejectedCount ?? peoplesLastResortCase.rejectedCount),
    courtOutcome: validCourtOutcomes.includes(overrides.courtOutcome)
      ? overrides.courtOutcome
      : peoplesLastResortCase.courtOutcome,
    status: validCaseStatuses.includes(overrides.status) ? overrides.status : peoplesLastResortCase.status,
  };
}

export function mergeFtcaConsentChallengeCaseState(overrides = {}) {
  return {
    ...ftcaConsentChallengeCase,
    ...overrides,
    thresholdValue: coerceThresholdValue(overrides.thresholdValue ?? ftcaConsentChallengeCase.thresholdValue),
    verifiedCount: coerceCount(overrides.verifiedCount ?? ftcaConsentChallengeCase.verifiedCount),
    rawSubmissionCount: overrides.rawSubmissionCount == null ? null : coerceCount(overrides.rawSubmissionCount),
    pendingCount: coerceCount(overrides.pendingCount ?? ftcaConsentChallengeCase.pendingCount),
    rejectedCount: coerceCount(overrides.rejectedCount ?? ftcaConsentChallengeCase.rejectedCount),
    courtOutcome: validCourtOutcomes.includes(overrides.courtOutcome)
      ? overrides.courtOutcome
      : ftcaConsentChallengeCase.courtOutcome,
    status: validCaseStatuses.includes(overrides.status) ? overrides.status : ftcaConsentChallengeCase.status,
  };
}

export function getPeoplesLastResortState(caseConfig = peoplesLastResortCase) {
  const normalizedCase = mergePeoplesLastResortCaseState(caseConfig);
  const thresholdConfigured = typeof normalizedCase.thresholdValue === 'number' && normalizedCase.thresholdValue > 0;
  const thresholdMet = thresholdConfigured && normalizedCase.verifiedCount > normalizedCase.thresholdValue;
  const deniedByCourt = normalizedCase.courtOutcome === 'dismissed' || normalizedCase.courtOutcome === 'denied';

  const thresholdRatio =
    thresholdConfigured && normalizedCase.thresholdValue > 0
      ? Math.min(normalizedCase.verifiedCount / normalizedCase.thresholdValue, 1)
      : null;

  const thresholdRemaining =
    thresholdConfigured && normalizedCase.thresholdValue > normalizedCase.verifiedCount
      ? normalizedCase.thresholdValue - normalizedCase.verifiedCount
      : 0;

  return {
    ...normalizedCase,
    thresholdConfigured,
    thresholdMet,
    deniedByCourt,
    thresholdRatio,
    thresholdRemaining,
    showPostDenialNotice: thresholdMet && deniedByCourt,
  };
}

export function getFtcaConsentChallengeState(caseConfig = ftcaConsentChallengeCase) {
  const normalizedCase = mergeFtcaConsentChallengeCaseState(caseConfig);
  const thresholdConfigured = typeof normalizedCase.thresholdValue === 'number' && normalizedCase.thresholdValue > 0;
  const thresholdMet = thresholdConfigured && normalizedCase.verifiedCount > normalizedCase.thresholdValue;
  const deniedByCourt = normalizedCase.courtOutcome === 'dismissed' || normalizedCase.courtOutcome === 'denied';

  const thresholdRatio =
    thresholdConfigured && normalizedCase.thresholdValue > 0
      ? Math.min(normalizedCase.verifiedCount / normalizedCase.thresholdValue, 1)
      : null;

  const thresholdRemaining =
    thresholdConfigured && normalizedCase.thresholdValue > normalizedCase.verifiedCount
      ? normalizedCase.thresholdValue - normalizedCase.verifiedCount
      : 0;

  return {
    ...normalizedCase,
    thresholdConfigured,
    thresholdMet,
    deniedByCourt,
    thresholdRatio,
    thresholdRemaining,
    showPostDenialNotice: thresholdMet && deniedByCourt,
  };
}