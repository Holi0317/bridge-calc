import { DropdownSource } from "../material/dropdown";

/**
 * Create sources for react-toolbox's dropdown component.
 * The given array will be used as value in sources.
 * The label generated will be the stringfied version of value.
 * @param values - Array of value that will be source's value when generated.
 * @returns - Source array to be used in React-toolbox dropdown
 */
export function createSource(values: number[]): DropdownSource<number>[] {
  return values.map(s => ({ value: s, label: s + "" }));
}
