// @flow
import type {GameState} from '../../reducer/current-game/types'
import type {IPlayerMap} from '../../types'

export type SettingsActions =
  | SET_BY_GAME_STATE_ACTION
  | SET_MAKER_ACTION
  | SET_NAMES_ACTION
  | ADD_NAME_ACTION

/**
 * Set state of settings section by given game state.
 * If the state is null or stage is end, settings state will return to default.
 */
export const SET_BY_GAME_STATE: 'UI/SETTINGS/SET_BY_GAME_STATE' = 'UI/SETTINGS/SET_BY_GAME_STATE'
export type SET_BY_GAME_STATE_ACTION = {
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
export const SET_MAKER: 'UI/SETTINGS/SET_MAKER' = 'UI/SETTINGS/SET_MAKER'
export type SET_MAKER_ACTION = {
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
export const SET_NAMES: 'UI/SETTINGS/SET_NAMES' = 'UI/SETTINGS/SET_NAMES'
export type SET_NAMES_ACTION = {
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
export type ADD_NAME_ACTION = {
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
