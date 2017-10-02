/**
 * Helper function for reducer.
 * Calculate score of this round from given parameters.
 *
 * @param bid - Number of bid stack given
 * @param win - Number of win gain stack
 * @return Score of the player at that round
 */
export function calculateScore(bid: number, win: number): number {
  if (bid === win) {
    return (bid) ** 2 + 10
  } else {
    return -((win - bid) ** 2)
  }
}
