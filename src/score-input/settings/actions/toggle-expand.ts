import { createAction } from "typesafe-actions";
import { PANEL } from "../panel";
import { ActionTypes } from "../../../action-types";

/**
 * Toggle expansion state a setting panel
 *
 * @param panel - The panel to be toggled
 */
export const toggleExpandAction = createAction(
  ActionTypes.TOGGLE_SETTING_PANEL,
  (panel: PANEL) => panel
)();
