// @flow
export type EntryActions =
  | OPTION_OPEN_TOGGLE_ACTION
  | ROUNDS_SET_ACTION
  | CARDS_SET_ACTION
  | STARTING_ROUND_SET_ACTION
  | PLAYER_NAMES_SET_ACTION
  | ADD_PLAYER_ACTION

/**
 * Toggle open state for entry options.
 * No parameter required.
 * @type {string}
 */
export const OPTION_OPEN_TOGGLE: 'UI/ENTRY/OPTION_OPEN_TOGGLE' = 'UI/ENTRY/OPTION_OPEN_TOGGLE'
export type OPTION_OPEN_TOGGLE_ACTION = {
  type: typeof OPTION_OPEN_TOGGLE
}

/**
 * Set rounds for entry options.
 * Parameter:
 *  - (payload: integer) The rounds to be set
 * @type {string}
 */
export const ROUNDS_SET: 'UI/ENTRY/ROUNDS_SET' = 'UI/ENTRY/ROUNDS_SET'
export type ROUNDS_SET_ACTION = {
  type: typeof ROUNDS_SET,
  payload: number
}

/**
 * Set number of cards for entry options.
 * Parameter:
 *  - (payload: integer) The number of cards to be set
 * @type {string}
 */
export const CARDS_SET: 'UI/ENTRY/CARDS_SET' = 'UI/ENTRY/CARDS_SET'
export type CARDS_SET_ACTION = {
  type: typeof CARDS_SET,
  payload: number
}

/**
 * Set starting round for entry options.
 * Parameter:
 *  - (payload: integer) The starting round to be set
 * @type {string}
 */
export const STARTING_ROUND_SET: 'UI/ENTRY/STARTING_ROUND_SET' = 'UI/ENTRY/STARTING_ROUND_SET'
export type STARTING_ROUND_SET_ACTION = {
  type: typeof STARTING_ROUND_SET,
  payload: number
}

/**
 * Set player names that will be in the game for entry options.
 * This can handle change, add and delete operations.
 * But there is another action UI/ENTRY/ADD_PLAYER just for appending new player.
 * Parameter:
 *  - (payload: string[]) The array of player names to be set
 * @type {string}
 */
export const PLAYER_NAMES_SET: 'UI/ENTRY/PLAYER_NAMES_SET' = 'UI/ENTRY/PLAYER_NAMES_SET'
export type PLAYER_NAMES_SET_ACTION = {
  type: typeof PLAYER_NAMES_SET,
  payload: string[]
}

/**
 * Add a new player for entry options.
 * Parameter:
 *  - (payload: string) The name of new player
 * @type {string}
 */
export const ADD_PLAYER: 'UI/ENTRY/ADD_PLAYER' = 'UI/ENTRY/ADD_PLAYER'
export type ADD_PLAYER_ACTION = {
  type: typeof ADD_PLAYER,
  payload: string
}
