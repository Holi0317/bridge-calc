import { createAction } from "typesafe-actions";
import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

/**
 * End winning process in bridge game.
 * I.e. End one round
 *
 * @param win - A map that maps player ID to their win choice.
 * If this is not defined, win property in currentGame state will be used as fallback.
 */
export const winAction = createAction(
  ActionTypes.WIN,
  (win?: PlayerMap<number>) => ({
    win,
    time: new Date().getTime()
  })
)();
