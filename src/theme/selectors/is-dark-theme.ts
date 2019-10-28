import { RootState } from "../../types";

/**
 * Select if dark theme should be used
 * @param state Redux state tree
 */
export function isDarkThemeSelector(state: RootState): boolean {
  return state.theme.dark;
}
