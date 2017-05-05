// @flow
/**
 * Game stages
 * @enum
 */
export class GameStage {
  /**
   * Waiting for bid result in this round.
   */
  static waitingBid: 'waitingBid' = 'waitingBid'
  /**
   * Waiting for win result in this round.
   */
  static waitingWin: 'waitingWin' = 'waitingWin'
  /**
   * Whole game has ended.
   */
  static ended: 'ended' = 'ended'
}
