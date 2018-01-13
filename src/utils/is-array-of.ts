/**
 * Check if given object is array of same type.
 *
 * If the object is not an array, validation would fail.
 * @param obj - Array to be validate against
 * @param of - type expected to be. Only accept primitive type (Those in typeof check)
 * @returns {boolean} - Validation result. True for ass and false for failed
 */
export function isArrayOf(obj: any, of: string): boolean {
  if (!Array.isArray(obj)) {
    return false
  }
  return obj.every(el => typeof el === of)
}
