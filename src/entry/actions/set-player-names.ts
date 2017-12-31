import {ActionTypes} from '../../action-types'

export interface ISetPlayerNamesAction {
  type: ActionTypes.SET_PLAYER_NAMES,
  payload: string[]
}

/**
 * Set player names that will be in the game for entry options.
 * This action replaces old player names array with new one.
 * This can handle change, add and delete operations.
 * For appending one player only, action ENTRY/ADD_PLAYER can be used.
 * @param payload - The array of player names to be replaced
 */
export function setPlayerNamesAction(payload: string[]): ISetPlayerNamesAction {
  return {type: ActionTypes.SET_PLAYER_NAMES, payload}
}
