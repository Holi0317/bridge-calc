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

/**
 * NOTE: This is NOT lodash.nth method.
 * Get an element from given array.
 * If index is in range of array length, this would be identical to array[i].
 * If index is out of range, reduce it until it is in range of array and get element.
 * @example
 * nth(['a', 'b', 'c'], 4)
 * // -> 'b'
 * @param array - Array to be operated
 * @param index - Index of wanted element
 * @returns {T}
 */
export function nth<T>(array: T[], index: number): T {
  return (index > array.length) ? nth(array, index - array.length) : array[index];
}

/**
 * Sort array by putting frontIndex element to the first.
 * Does NOT mutate the original array.
 * @example
 * toFront(['a', 'b', 'c'], 1)
 * // -> ['b', 'c', 'a']
 * @param array
 * @param frontIndex
 * @returns {T}
 */
export function toFront<T>(array: T[], frontIndex: number): T[] {
  let newArray: T[] = [];
  for (let i = frontIndex; i < array.length + frontIndex; i++) {
    newArray[i-frontIndex] = nth(array, i);
  }
  return newArray;
}
