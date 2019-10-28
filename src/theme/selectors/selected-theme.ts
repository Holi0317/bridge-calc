import { RootState } from "../../types";

/**
 * Select selected theme name (in English) by user.
 */
export function selectedThemeSelector(state: RootState): string {
  return state.theme.theme;
}
