import {ActionTypes} from '../../action-types'

export interface IResetAction {
  type: ActionTypes.RESET_ENTRY
}

/**
 * Reset state to default one.
 */
export function resetAction(): IResetAction {
  return {type: ActionTypes.RESET_ENTRY}
}
