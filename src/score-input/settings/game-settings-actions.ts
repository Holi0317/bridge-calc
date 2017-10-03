import {GameState} from '../reducer/types'
import {IPlayerMap} from '../../types'

export type GameSettingsActions =
  | ISetByGameStateAction
  | ISetMakerAction
  | ISetNamesAction
  | IAddNameAction

/**
 * Set state of settings section by given game state.
 * If the state is null or stage is end, settings state will return to default.
 */
export const SET_BY_GAME_STATE: 'GAME_SETTINGS/SET_BY_GAME_STATE' = 'GAME_SETTINGS/SET_BY_GAME_STATE'
export interface ISetByGameStateAction {
  type: typeof SET_BY_GAME_STATE,
  /**
   * Game state to be followed for setting settings state.
   */
  state: GameState
}

/**
 * Set maker in UI settings UI.
 * This does NOT change anything in currentGame state of our store.
 */
export const SET_MAKER: 'GAME_SETTINGS/SET_MAKER' = 'GAME_SETTINGS/SET_MAKER'
export interface ISetMakerAction {
  type: typeof SET_MAKER,
  /**
   * The Player ID of maker to be set.
   */
  maker: string
}

/**
 * Set names state in settings UI.
 * This does NOT change anything in currentGame state of our store
 */
export const SET_NAMES: 'GAME_SETTINGS/SET_NAMES' = 'GAME_SETTINGS/SET_NAMES'
export interface ISetNamesAction {
  type: typeof SET_NAMES,
  /**
   * New name map to be set.
   */
  newNames: IPlayerMap<string>
}

/**
 * Add a name to settings UI state and append to the end of the list.
 */
export const ADD_NAME: 'UI/SETTING/ADD_NAME' = 'UI/SETTING/ADD_NAME'
export interface IAddNameAction {
  type: typeof ADD_NAME,
  /**
   * Name of the new player
   */
  name: string,
  /**
   * A new ID for him/her.
   */
  ID: string
}
