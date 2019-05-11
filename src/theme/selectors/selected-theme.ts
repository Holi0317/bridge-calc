import { IRootState } from "../../types";

/**
 * Select selected theme name (in English) by user.
 */
export function selectedThemeSelector(state: IRootState): string {
  return state.theme.theme;
}
