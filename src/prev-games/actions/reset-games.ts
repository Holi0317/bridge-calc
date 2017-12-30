import {ActionTypes} from '../../action-types'

export interface IResetGamesAction {
  type: ActionTypes.RESET_GAMES
}

/**
 * Clear previous games array from redux state tree.
 */
export function resetGamesAtion(): IResetGamesAction {
  return {type: ActionTypes.RESET_GAMES}
}
