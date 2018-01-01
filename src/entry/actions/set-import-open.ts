import {ActionTypes} from '../../action-types'

export interface ISetImportOpenAction {
  type: ActionTypes.SET_IMPORT_OPEN,
  payload: boolean
}

export function setImportOpenAction(payload: boolean): ISetImportOpenAction {
  return {type: ActionTypes.SET_IMPORT_OPEN, payload}
}
