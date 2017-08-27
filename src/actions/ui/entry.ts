export type EntryActions =
  | IOptionOpenToggleAction
  | IRoundsSetAction
  | ICardsSetAction
  | IStartingRoundSetAction
  | IPlayerNamesSetAction
  | IAddPlayerAction

/**
 * Toggle open state for entry options.
 * No parameter required.
 * @type {string}
 */
export const OPTION_OPEN_TOGGLE: 'UI/ENTRY/OPTION_OPEN_TOGGLE' = 'UI/ENTRY/OPTION_OPEN_TOGGLE'
export interface IOptionOpenToggleAction {
  type: typeof OPTION_OPEN_TOGGLE
}

/**
 * Set rounds for entry options.
 * Parameter:
 *  - (payload: integer) The rounds to be set
 * @type {string}
 */
export const ROUNDS_SET: 'UI/ENTRY/ROUNDS_SET' = 'UI/ENTRY/ROUNDS_SET'
export interface IRoundsSetAction {
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
export interface ICardsSetAction {
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
export interface IStartingRoundSetAction {
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
export interface IPlayerNamesSetAction {
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
export interface IAddPlayerAction {
  type: typeof ADD_PLAYER,
  payload: string
}
