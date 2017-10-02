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
