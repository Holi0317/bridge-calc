// @flow
export type CurrentGameActions =
  | START_ACTION
  | SKIP_ACTION
  | SET_BID_ACTION
  | BID_ACTION
  | SET_WIN_ACTION
  | WIN_ACTION

/**
 * Start a new game that overrides existing game.
 * @type {string}
 */
export const START = 'CURRENT_GAME/START'
/**
 * Parameter for START action
 */
export type START_ACTION = {
  type: 'CURRENT_GAME/START',
  /**
   * Total number of rounds in the whole game
   */
  rounds: number,
  /**
   * Player names in the game. This is a map that map player ID to their name.
   * Ordering of the names will be used as the player order for first round.
   */
  playerNames: {[playerID: string]: string},
  /**
   * Time of starting game
   */
  startTime: Date,
  /**
   * The round to start from
   */
  startingRound: number
}

/**
 * Skip n round(s).
 * @type {string}
 */
export const SKIP = 'CURRENT_GAME/SKIP'
export type SKIP_ACTION = {
  type: 'CURRENT_GAME/SKIP',
  /**
   * Number of rounds to be skip.
   * If not provided, current round will be skip.
   */
  times?: number,
  /**
   * Time for skipping round.
   * This will be used if the round skipped is last round.
   */
  time: Date
}

/**
 * Set the bid property in current game cache.
 * Not to be confused with BID action.
 * @type {string}
 */
export const SET_BID = 'CURRENT_GAME/SET_BID'
export type SET_BID_ACTION = {
  type: 'CURRENT_GAME/SET_BID',
  payload: {
    /**
     * A map that maps player ID to their bid choice
     */
    [playerID: string]: number
  }
}

/**
 * End bidding process in bridge game
 * @type {string}
 */
export const BID = 'CURRENT_GAME/BID'
export type BID_ACTION = {
  type: 'CURRENT_GAME/BID',
  payload: {
    /**
     * A map that maps player ID to their bid choice
     */
    [playerID: string]: number
  }
}

/**
 * Set the win property in current game cache.
 * Not to be confused with WIN action.
 * @type {string}
 */
export const SET_WIN = 'CURRENT_GAME/SET_WIN'
export type SET_WIN_ACTION = {
  type: 'CURRENT_GAME/SET_WIN',
  payload: {
    /**
     * A map that maps player ID to their win choice
     */
    [playerID: string]: number
  }
}

/**
 * End winning process in bridge game.
 * I.e. End one round
 */
export const WIN = 'CURRENT_GAME/WIN'
export type WIN_ACTION = {
  type: 'CURRENT_GAME/WIN',
  /**
   * A map that maps player ID to their win choice
   */
  win: {[playerID: string]: number},
  /**
   * Time when this round ends
   */
  time: Date
}
