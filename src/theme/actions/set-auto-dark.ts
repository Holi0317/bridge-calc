import {ActionTypes} from '../../action-types'

export interface ISetAutoDarkAction {
  type: ActionTypes.SET_AUTO_DARK
  payload: boolean
}

/**
 * Set auto dark theme base on light sensor.
 *
 * When this feature is disabled, the sensor data will also be cleared.
 */
export function setAutoDarkAction(payload: boolean): ISetAutoDarkAction {
  return {type: ActionTypes.SET_AUTO_DARK, payload}
}
