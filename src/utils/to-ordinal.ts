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
