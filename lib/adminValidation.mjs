export function isDocumentId(value) {
  return typeof value === 'string' && value.length > 0 &&
    Buffer.byteLength(value, 'utf8') <= 1500 && !value.includes('/') &&
    value !== '.' && value !== '..' && !/^__.*__$/.test(value);
}

export function parseThreshold(value) {
  if (value === '' || value === null) return { valid: true, value: null };
  if ((typeof value !== 'number' && typeof value !== 'string') ||
      (typeof value === 'string' && !/^\d+$/.test(value))) return { valid: false };
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? { valid: true, value: number } : { valid: false };
}

export function isOptionalText(value, maxLength) {
  return value === undefined || value === null || (typeof value === 'string' && value.length <= maxLength);
}
