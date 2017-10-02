/**
 * Generate a (hopefully) unique ID with 4 characters
 */
export function genID(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}
