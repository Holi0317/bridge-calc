/**
 * Generate a (hopefully) unique ID with 4 characters
 */
export function genID() {
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
export function range(start, end) {
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
 * @param array {T[]} - Array to be operated
 * @param index {number} - Index of wanted element
 * @returns {T}
 */
export function nth(array, index) {
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
 * @param array {Array} - The original array
 * @param frontIndex {number} - Index of element that need to be moved to front.
 * @returns {T}
 */
export function toFront(array, frontIndex) {
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
 * Fill in value of given array if original one is null/undefined.
 * @example
 * let original = [{ foo: 1 }, { foo: null }]
 * fill(original, 'foo', 2)
 * // original will be [{ foo: 1 }, { foo: 2 }]
 * @param array {Array} - Array of object to be mutated
 * @param prop {string} - Property path to the desired mutation. Dot notation is not supported
 * @param value {any} - Value to be filled in if original value is null/undefined
 */
export function fill(array, prop, value) {
  for (const element of array) {
    if (element[prop] == null || element[prop] === '') {
      element[prop] = value
    }
  }
}

/**
 * Return the last element from an array.
 * If the array is empty, null will be returned
 * @param array {Array}
 */
export function last(array) {
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
 * @param error {Object} - Error object to be tested
 */
export function isOk(error) {
  return JSON.stringify(error) === '{}'
}
