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
