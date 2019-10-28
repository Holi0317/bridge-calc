import { ActionTypes } from "../../action-types";

export interface SetThemeAction {
  type: ActionTypes.SET_THEME;
  theme: string;
}

/**
 * Set theme of the app.
 * See theme-sources.ts for available themes.
 */
export function setThemeAction(theme: string): SetThemeAction {
  return { type: ActionTypes.SET_THEME, theme };
}
