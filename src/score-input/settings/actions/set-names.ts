import fromPairs from 'lodash-es/fromPairs'
import {ActionTypes} from '../../../action-types'
import {IPlayerMap} from '../../../types'
import {PlayerName} from '../selectors/name-input-list-source'

export interface ISetNamesAction {
  type: ActionTypes.SET_NAMES,
  /**
   * New name map to be set.
   */
  newNames: IPlayerMap<string>
}

/**
 * Set names state in settings UI.
 * This does NOT change anything in currentGame state in the store
 * @param newNames - New name map to be set.
 */
export function setNamesAction(newNames: IPlayerMap<string>): ISetNamesAction {
  return {type: ActionTypes.SET_NAMES, newNames}
}

export function setNamesFromArrayAction(newNames: PlayerName[]): ISetNamesAction {
  return {type: ActionTypes.SET_NAMES, newNames: fromPairs(newNames)}
}
