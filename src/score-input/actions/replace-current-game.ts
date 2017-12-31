import {GameState} from '../reducer'
import {ActionTypes} from '../../action-types'

export interface IReplaceCurrentGameAction {
  type: ActionTypes.REPLACE_CURRENT_GAME
  payload: GameState
}

export function replaceCurrentGameAction(payload: GameState): IReplaceCurrentGameAction {
  return {type: ActionTypes.REPLACE_CURRENT_GAME, payload}
}
