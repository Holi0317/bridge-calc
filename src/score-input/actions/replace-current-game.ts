import { createAction } from "typesafe-actions";
import { GameState } from "../reducer";
import { ActionTypes } from "../../action-types";

export const replaceCurrentGameAction = createAction(
  ActionTypes.REPLACE_CURRENT_GAME,
  (payload: GameState) => payload
)();
