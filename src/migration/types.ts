/**
 * Represent the data structure of a game in v1.0.0
 */
export interface OldGameData {
  /**
   * Current round of the game
   */
  currentRound: number | null;
  /**
   * The index of maker of this round. Points to the players array.
   */
  maker: number | null;
  /**
   * Array of players in the game
   */
  players: OldPlayers[];
  /**
   * Current stage of the game
   */
  state: OldState;
  /**
   * Total number of rounds of the game
   */
  totalRounds: number;
}

/**
 * Represent the data structure of a player in v1.0.0
 */
export interface OldPlayers {
  /**
   * Bid for the current round.
   */
  bid: string | null;
  /**
   * Win for the current round.
   */
  win: string | null;
  /**
   * Score of each round.
   * Index of the array represent the round number.
   * While value is the score this player got on that round.
   */
  score: number[];
  /**
   * Name of this player
   */
  name: string;
}

/**
 * The enum for state property under IOldGameData
 */
export enum OldState {
  /**
   * No info is filled in. Game is not yet started.
   */
  notStarted = 0,
  /**
   * Bid for stack before each round
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
