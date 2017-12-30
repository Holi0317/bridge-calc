import {PrevGameEntry} from '../types'

export const ADD_GAME: 'PREV_GAMES/ADD_GAME' = 'PREV_GAMES/ADD_GAME'
export interface IAddGameAction {
  type: typeof ADD_GAME
  payload: PrevGameEntry
}

/**
 * Push a prevGame entry to the head of prevGame array in state.
 * @param payload - The prevGame entry
 */
export function addGameAction(payload: PrevGameEntry): IAddGameAction {
  return {type: ADD_GAME, payload}
}
