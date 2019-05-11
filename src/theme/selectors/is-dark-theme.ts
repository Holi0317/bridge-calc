import { IRootState } from "../../types";

/**
 * Select if dark theme should be used
 * @param state Redux state tree
 */
export function isDarkThemeSelector(state: IRootState): boolean {
  return state.theme.dark;
}
