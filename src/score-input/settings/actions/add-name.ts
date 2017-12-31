import {ActionTypes} from '../../../action-types'
import * as cuid from 'cuid'
import {randomName} from '../../../example-names'

export interface IAddNameAction {
  type: ActionTypes.ADD_NAME,
  /**
   * Name of the new player
   */
  name: string,
  /**
   * A new ID for him/her.
   */
  ID: string
}

/**
 * Add a name to settings UI state and append to the end of the list.
 * This does NOT change currentGame state in the store.
 * @param name - Name of the new Player
 */
export function addNameAction(name: string): IAddNameAction {
  return {type: ActionTypes.ADD_NAME, name, ID: cuid()}
}

export function addRandomNameAction(): IAddNameAction {
  return {type: ActionTypes.ADD_NAME, name: randomName(), ID: cuid()}
}
