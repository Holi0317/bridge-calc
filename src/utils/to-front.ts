import { nth } from "./nth";

/**
 * Sort array by putting frontIndex element to the first.
 * Does NOT mutate the original array.
 * @example
 * toFront(['a', 'b', 'c'], 1)
 * // -> ['b', 'c', 'a']
 * @param array - The original array
 * @param frontIndex - Index of element that need to be moved to front.
 */
export function toFront<T>(array: T[], frontIndex: number): T[] {
  if (frontIndex >= array.length) {
    throw new Error("frontIndex is out of boundary");
  }
  const newArray = [];
  for (let i = frontIndex; i < array.length + frontIndex; i++) {
    newArray[i - frontIndex] = nth(array, i);
  }
  return newArray;
}
