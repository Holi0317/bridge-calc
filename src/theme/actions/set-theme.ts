import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

/**
 * Set theme of the app.
 * See theme-sources.ts for available themes.
 *
 * @param theme Name of the theme to be set
 */
export const setThemeAction = createAction(
  ActionTypes.SET_THEME,
  (theme: string) => theme
)();
