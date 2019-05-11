/**
 * Enum of game stages
 */
export enum GameStage {
  /**
   * Waiting for bid result in this round.
   */
  waitingBid = "waitingBid",
  /**
   * Waiting for win result in this round.
   */
  waitingWin = "waitingWin",
  /**
   * Whole game has ended.
   */
  ended = "ended"
}
