/**
 * Game stages
 * @enum
 */
export const gameStage = {
  /**
   * Waiting for bid result in this round.
   */
  waitingBid: 'waitingBid',
  /**
   * Waiting for win result in this round.
   */
  waitingWin: 'waitingWin',
  /**
   * Whole game has ended.
   */
  ended: 'ended'
}

export type GameStage = $Enum<gameStage>
