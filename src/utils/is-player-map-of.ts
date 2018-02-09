import {isArrayOf} from './is-array-of'

/**
 * Check if given object is an IPlayerMap object.
 *
 * @param obj - Object to be validated against
 * @param of - string representation of the type (Because IPlayerMap is an generic)
 * Only primitive can be used (as used in typeof check).
 * Or use `type[]` to notate array of `type`, where type must also be primitive and
 * at most 1 dimension array is allowed.
 * @returns - Validation result. True for pass and false for failed
 * @see IPlayerMap
 */
export function isPlayerMapOf(obj: any, of: string): boolean {
  const type = of.replace('[]', '')
  const cmp = of.endsWith('[]')
    ? (val: any) => isArrayOf(val, type)
    : (val: any) => typeof val === of

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !cmp(obj[key])) {
      return false
    }
  }
  return true
}
