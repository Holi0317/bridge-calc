import { PANEL } from "../panel";
import { ActionTypes } from "../../../action-types";

export interface ToggleExpandAction {
  type: ActionTypes.TOGGLE_SETTING_PANEL;
  /**
   * The panel to be toggled.
   */
  panel: PANEL;
}

/**
 * Toggle expansion state a setting panel
 *
 * @param panel - The panel to be toggled
 */
export function toggleExpandAction(panel: PANEL): ToggleExpandAction {
  return { type: ActionTypes.TOGGLE_SETTING_PANEL, panel };
}
