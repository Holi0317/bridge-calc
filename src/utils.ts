/**
 * Generate a (hopefully) unique ID with 4 characters
 */
export function genID() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * Generate an array form start to end.
 * Inspired by python's range method.
 *
 * @example
 * range(1, 10)
 * // -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * @param start Start from
 * @param end Ends with (inclusive)
 * @returns {number[]}
 */
export function range(start: number, end: number) {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
