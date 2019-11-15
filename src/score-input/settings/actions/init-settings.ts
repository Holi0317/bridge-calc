import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../../action-types";
import { GameState } from "../../reducer";

/**
 * Initiate state of settings section by given game state.
 * If the state is null or stage is end, settings state will return to default.
 * @param state - Game state of on-going session
 */
export const initSettingsAction = createAction(
  ActionTypes.INIT_SETTINGS,
  (state: GameState) => state
)();
