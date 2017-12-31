import {ActionTypes} from '../../action-types'

export interface IToggleOptionOptionAction {
  type: ActionTypes.TOGGLE_OPTION_OPEN
}

/**
 * Toggle open state for entry options.
 */
export function toggleOptionOpenAction(): IToggleOptionOptionAction {
  return {type: ActionTypes.TOGGLE_OPTION_OPEN}
}
