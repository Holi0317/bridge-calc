import { randomName } from "../../example-names";
import { ActionTypes } from "../../action-types";
import { cuid } from "../../utils";

export interface IAddPlayerAction {
  type: ActionTypes.ADD_PLAYER;
  payload: {
    value: string;
    id: string;
  };
}

/**
 * Add a new player for entry options.
 * @parm name - The name of new player
 */
export function addPlayerAction(name: string): IAddPlayerAction {
  return {
    type: ActionTypes.ADD_PLAYER,
    payload: {
      value: name,
      id: cuid()
    }
  };
}

/**
 * Add a new player with random name to entry options.
 */
export function addRandomPlayerAction(): IAddPlayerAction {
  return addPlayerAction(randomName());
}
