/**
 * Set title for app bar.
 * Parameter:
 *  - (payload: string) The title to be set
 * @type {string}
 */
export const SET_TITLE = 'SET_TITLE'

/**
 * Toggle open state for entry options.
 * No parameter required.
 * @type {string}
 */
export const UI_ENTRY_OPTION_OPEN_TOGGLE = 'UI_ENTRY_OPTION_OPEN_TOGGLE'

/**
 * Set rounds for entry options.
 * Parameter:
 *  - (payload: integer) The rounds to be set
 * @type {string}
 */
export const UI_ENTRY_ROUNDS_SET = 'UI_ENTRY_ROUNDS_SET'

/**
 * Set number of cards for entry options.
 * Parameter:
 *  - (payload: integer) The number of cards to be set
 * @type {string}
 */
export const UI_ENTRY_CARDS_SET = 'UI_ENTRY_CARDS_SET'

/**
 * Set starting round for entry options.
 * Parameter:
 *  - (payload: integer) The starting round to be set
 * @type {string}
 */
export const UI_ENTRY_STARTING_ROUND_SET = 'UI_ENTRY_STARTING_ROUND_SET'

/**
 * Set player names that will be in the game for entry options.
 * This can handle change, add and delete operations.
 * But there is another action UI_ENTRY_ADD_PLAYER just for appending new player.
 * Parameter:
 *  - (payload: string[]) The array of player names to be set
 * @type {string}
 */
export const UI_ENTRY_PLAYER_NAMES_SET = 'UI_ENTRY_PLAYER_NAMES_SET'

/**
 * Add a new player for entry options.
 * Parameter:
 *  - (payload: string) The name of new player
 * @type {string}
 */
export const UI_ENTRY_ADD_PLAYER = 'UI_ENTRY_ADD_PLAYER'
