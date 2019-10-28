import { ActionTypes } from "../../action-types";

export interface ResetGamesAction {
  type: ActionTypes.RESET_GAMES;
}

/**
 * Clear previous games array from redux state tree.
 */
export function resetGamesAtion(): ResetGamesAction {
  return { type: ActionTypes.RESET_GAMES };
}
