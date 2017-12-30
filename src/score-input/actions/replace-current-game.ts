import {GameState} from '../reducer'

export const REPLACE_CURRENT_GAME: 'CURRENT_GAME/REPLACE_CURRENT_GAME' = 'CURRENT_GAME/REPLACE_CURRENT_GAME'
export interface IReplaceCurrentGameAction {
  type: typeof REPLACE_CURRENT_GAME
  payload: GameState
}

export function replaceCurrentGameAction(payload: GameState): IReplaceCurrentGameAction {
  return {type: REPLACE_CURRENT_GAME, payload}
}
