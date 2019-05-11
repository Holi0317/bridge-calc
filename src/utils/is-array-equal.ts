/**
 * Check for equality of given two arrays.
 *
 * Note: The two arrays must have same element order in
 * order to pass the test.
 */
export function isArrayEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((el, index) => el === b[index]);
}
