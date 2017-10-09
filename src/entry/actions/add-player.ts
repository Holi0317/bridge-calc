import {randomName} from '../../example-names'

export const ADD_PLAYER: 'ENTRY/ADD_PLAYER' = 'ENTRY/ADD_PLAYER'
export interface IAddPlayerAction {
  type: typeof ADD_PLAYER,
  payload: string
}

/**
 * Add a new player for entry options.
 * @parm payload - The name of new player
 */
export function addPlayerAction(payload: string): IAddPlayerAction {
  return {type: ADD_PLAYER, payload}
}

/**
 * Add a new player with random name to entry options.
 */
export function addRandomPlayer(): IAddPlayerAction {
  return addPlayerAction(randomName())
}
