export const GameState = {
  /**
   * No info is filled in. Game is not yet started.
   */
  NOT_STARTED: 0,
  /**
   * bid for stack before each round
   */
  BID: 1,
  /**
   * Wait for user to input win stack
   */
  WIN: 2,
  /**
   * This round has ended. Showing this round result and wait for next round to start
   */
  ROUND_END: 3,
  /**
   * Game has end by reaching the last round and ended
   */
  GAME_END: 4
};

/**
 * Calculate score of this round from given parameters.
 *
 * @param bid - Number of bid stack given
 * @param win - Number of win gain stack
 * @return Score of the player at that round
 */
function calculateScore(bid: number, win: number): number {
  if (bid === win) {
    return bid ** 2 + 10;
  } else {
    return -((win-bid) ** 2);
  }
}

/**
 * Game controller logic. (Or service, in Angular2 term).
 *
 * @prop state - Current state of game.
 * @prop {?number} totalRounds - Total number of rounds.
 * @prop {?number} currentRound - Current round of the game.
 * @prop {?number} maker - Index of maker player in current game.
 * @prop {Bridge.Player[]} players - Players in current game.
 */
export class GameService {

}
