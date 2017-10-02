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
