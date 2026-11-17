// Never serialize service errors: they can contain request bodies or credentials.
export function logServerFailure(event, error) {
  const safeCodes = new Set([
    'permission-denied', 'unauthenticated', 'unavailable', 'deadline-exceeded',
    'resource-exhausted', 'not-found', 'invalid-argument', 'failed-precondition',
    'storage/unauthorized', 'storage/retry-limit-exceeded',
  ]);
  console.error(event, { code: safeCodes.has(error?.code) ? error.code : 'internal-error' });
}
