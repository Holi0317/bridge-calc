import { ActionTypes } from "../../../action-types";
import { GameState } from "../../reducer";

export interface IInitSettingsAction {
  type: ActionTypes.INIT_SETTINGS;
  /**
   * Game state to be followed for setting settings state.
   */
  state: GameState;
}

/**
 * Initiate state of settings section by given game state.
 * If the state is null or stage is end, settings state will return to default.
 * @param state - Game state of on-going session
 */
export function initSettingsAction(state: GameState): IInitSettingsAction {
  return { type: ActionTypes.INIT_SETTINGS, state };
}
