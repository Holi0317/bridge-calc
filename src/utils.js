// @flow
/**
 * Generate a (hopefully) unique ID with 4 characters
 */
export function genID(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

/**
 * Generate an array form start to end.
 * Inspired by python's range method.
 *
 * @example
 * range(1, 10)
 * // -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * @param start {number} -  Start from
 * @param end {number} - Ends with (inclusive)
 * @returns {number[]}
 */
export function range(start: number, end: number): number[] {
  return Array.from(new Array(end - start + 1)).map((val, index) => index + start)
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
 * @returns Element
 */
export function nth<T>(array: T[], index: number): T {
  if (index < 0) {
    throw new Error('Index should be a positive number')
  }
  if (!Number.isInteger(index)) {
    throw new Error('Index should be an integer')
  }
  return (index >= array.length) ? nth(array, index - array.length) : array[index]
}

/**
 * Sort array by putting frontIndex element to the first.
 * Does NOT mutate the original array.
 * @example
 * toFront(['a', 'b', 'c'], 1)
 * // -> ['b', 'c', 'a']
 * @param array - The original array
 * @param frontIndex - Index of element that need to be moved to front.
 * @returns
 */
export function toFront<T>(array: T[], frontIndex: number): T[] {
  if (frontIndex >= array.length) {
    throw new Error('frontIndex is out of boundary')
  }
  const newArray = []
  for (let i = frontIndex; i < array.length + frontIndex; i++) {
    newArray[i - frontIndex] = nth(array, i)
  }
  return newArray
}

/**
 * Return the last element from an array.
 * If the array is empty, null will be returned
 * @param array
 */
export function last<T>(array: T[]): T | null {
  if (array.length === 0) {
    return null
  } else {
    const index = array.length - 1
    return array[index]
  }
}

/**
 * Test if there is error in the error object.
 * If no error, true will be returned. Vice versa for error object with error.
 * Meant to be used with validator.
 * @param error - Error object to be tested
 */
export function isOk(error: any): boolean {
  return JSON.stringify(error) === '{}'
}