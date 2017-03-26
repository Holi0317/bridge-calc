/**
 * Game states
 * @enum
 */
export enum GameState {
  /**
   * Shiny new GameBoard that is not initialized
   */
  NOT_STARTED = 0,
  /**
   * bid for stack before each round
   */
  BID = 1,
  /**
   * Wait for user to input win stack
   */
  WIN = 2,
  /**
   * Game has end by reaching the last round and ended
   */
  GAME_END = 3
}
