import {IDropdownSource} from './types'

/**
 * Generate a (hopefully) unique ID with 4 characters
 */
export function genID(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
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
 * Test if there is error in the error object.
 * If no error, true will be returned. Vice versa for error object with error.
 * Meant to be used with validator.
 * @param error - Error object to be tested
 */
export function isOk(error: any): boolean {
  return JSON.stringify(error) === '{}'
}

/**
 * Remove any undefined value from the object given.
 * Does NOT mutate the original object. Instead, a shallow clone will be returned.
 * @param obj
 */
export function removeUndef(obj: any): any {
  const cloned = {...obj}
  Object.entries(cloned).forEach(([key, value]) => (value == null || value === '') && delete cloned[key])
  return cloned
}

/**
 * Fill object with value given if key does not exist or the original value is null.
 * Does NOT mutate the original object.
 * @example
 * const obj = {a: 'yo', b: 'bar', c: null}
 * const keys = ['a', 'b', 'c', 'd']
 * fillObj(obj, keys, 'filled')
 * // -> {a: 'yo', b: 'bar', c: 'filled', d: 'filled'}
 * @param obj - Object to be filled
 * @param keys - Keys need to be present in the return object
 * @param value - Value to be filled if filling action need to be done
 */
export function fillObj<T>(obj: {[key: string]: T}, keys: string[], value: T): {[key: string]: T} {
  const cloned = {...obj}
  for (const key of keys) {
    if (cloned[key] == null) {
      cloned[key] = value
    }
  }
  return cloned
}

/**
 * Typed Object.entries.
 * This is just a helper function to bypass out flow's type checking
 */
export function toPairs(obj: any): any[] {
  return Object.entries(obj)
}

/**
 * Create sources for react-toolbox's dropdown component.
 * The given array will be used as value in sources.
 * The label generated will be the stringfied version of value.
 * @param values - Array of value that will be source's value when generated.
 * @returns {Array} - Source array to be used in React-toolbox dropdown
 */
export function createSource(values: number[]): Array<IDropdownSource<number>> {
  return values.map(s => ({value: s, label: s + ''}))
}

/**
 * Convert a number to its ordinal format.
 * The ordinal suffix will be appended to it.
 * Like 1 -> 1st, 2 -> 2nd.
 * @param value - Number to be converted
 */
export function toOrdinal(value: number): string {
  const suffix = ['th', 'st', 'nd', 'rd']
  const v = value % 100
  return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
}

/**
 * Check for duplicated elements in an array.
 * If duplicated elements were found, duplicate elements will be included in the returned array.
 * If empty array is returned, this implies no duplicate exist.
 * @param array
 */
export function dupe<T>(array: T[]): T[] {
  const seen = new Set<T>()
  const res: T[] = []
  array.forEach(element => {
    if (seen.has(element) && !res.includes(element)) {
      res.push(element)
    }
    seen.add(element)
  })
  return res
}
