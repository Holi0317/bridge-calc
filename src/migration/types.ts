/**
 * Represent the data structure of a game in v1.0.0
 */
export interface IOldGameData {
  /**
   * Current round of the game
   */
  currentRound: number
  /**
   * The index of maker of this round. Points to the players array.
   */
  maker: number
  /**
   * Array of players in the game
   */
  players: IOldPlayers[]
  /**
   * Current stage of the game
   */
  state: IOldState
  /**
   * Total number of rounds of the game
   */
  totalRounds: number
}

/**
 * Represent the data structure of a player in v1.0.0
 */
export interface IOldPlayers {
  /**
   * Bid for the current round.
   */
  bid: number
  /**
   * Win for the current round.
   */
  win: number
  /**
   * Score of each round.
   * Index of the array represent the round number.
   * While value is the score this player got on that round.
   */
  score: number[]
  /**
   * Name of this player
   */
  name: string
}

/**
 * The enum for state property under IOldGameData
 */
export enum IOldState {
  /**
   * No info is filled in. Game is not yet started.
   */
  notStarted = 0,
  /**
   * bid for stack before each round
   */
  bid = 1,
  /**
   * Wait for user to input win stack
   */
  inputWin = 2,
  /**
   * This round has ended. Showing this round result and wait for next round to start
   */
  waiting = 3,
  /**
   * Game has end by reaching the last round and ended
   */
  gameEnd = 4
}
