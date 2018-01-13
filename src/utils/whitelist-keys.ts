/**
 * Check if given object only contains given keys.
 *
 * This validation will fail if keys of the object is not identical to
 * given array of keys. More or less also raise error.
 * If the value of a key is undefined, the test will still pass.
 *
 * @param obj - Object to be validate against. Assumption: the object must not be null.
 * @param keys - Keys expected to contain in the object
 * @returns {boolean} - If validation pass or not
 */
export function whitelistKeys(obj: any, keys: string[]): boolean {
  const actualKeys = Object.keys(obj)
  const expectedKeys = [...keys]
  if (actualKeys.length !== keys.length) {
    return false
  }

  actualKeys.sort()
  expectedKeys.sort()
  return actualKeys.every((el, index) => el === expectedKeys[index])
}
