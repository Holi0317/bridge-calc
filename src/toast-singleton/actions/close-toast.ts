import {ActionTypes} from '../../action-types'

export interface ICloseToastAction {
  type: ActionTypes.CLOSE_TOAST
}

export function closeToastAction(): ICloseToastAction {
  return {type: ActionTypes.CLOSE_TOAST}
}
