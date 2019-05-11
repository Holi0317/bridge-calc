import { IPlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

export interface IWinAction {
  type: ActionTypes.WIN;
  win?: IPlayerMap<number>;
  time: number;
}

/**
 * End winning process in bridge game.
 * I.e. End one round
 *
 * @param win - A map that maps player ID to their win choice.
 * If this is not defined, win property in currentGame state will be used as fallback.
 */
export function winAction(win?: IPlayerMap<number>): IWinAction {
  return { type: ActionTypes.WIN, win, time: new Date().getTime() };
}
