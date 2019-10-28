import { ActionTypes } from "../../action-types";

export interface ResetAction {
  type: ActionTypes.RESET_ENTRY;
}

/**
 * Reset state to default one.
 */
export function resetAction(): ResetAction {
  return { type: ActionTypes.RESET_ENTRY };
}
