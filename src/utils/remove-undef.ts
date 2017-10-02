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
