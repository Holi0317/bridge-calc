/**
 * Calculate score of this round from given parameters.
 * Special case: If bid and win are undefined or is null, score would be 0.
 *
 * @param bid - Number of bid stack given
 * @param win - Number of win gain stack
 * @return Score of the player at that round
 */
function calculateScore(bid: ?number, win: ?number): number {
  if (bid == null && win == null) {
    return 0;
  } else if (bid === win) {
    return bid ** 2 + 10;
  } else {
    return -((win-bid) ** 2);
  }
}

/**
 * Scoreboard that controls one player's score in the whole game.
 */
export class Scoreboard {
  /**
   * Score map for this player.
   * Format should be round name -> score
   */
  private _scores: Map<string, number>;
  /**
   * Current bid.
   * See setScore method for details.
   */
  bid: ?number;
  /**
   * Current win.
   * See setScore method for details.
   */
  win: ?number;

  constructor() {
    this.reset();
  }

  /**
   * Reset and destroy scoreboard data.
   */
  reset() {
    this._scores = new Map();
    this.bid = null;
    this.win = null;
  }

  /**
   * Get score of a player on specified round.
   * If score data does not exists for that round, null is returned.
   * @param round
   * @returns ?number
   */
  getScore(round: string): ?number {
    const score = this._scores.get(round);
    return (score == null) ? null : score;
  }

  /**
   * Calculate score for a player on a round.
   * If score for that round already exists, it will be override.
   *
   * Implicitly use this.bid and this.win as parameter.
   * These two properties serves as a state machine for saving current bid and win number.
   * They will be reset when this method is called, no matter parameter is supplied or not.
   *
   * Special case: set bid and win parameters to null for setting 0 mark.
   * @param round
   * @param bid
   * @param win
   */
  calcScore(round: string, bid: ?number = this.bid, win: ?number = this.win) {
    this.bid = null;
    this.win = null;
    const score = calculateScore(bid, win);
    this._scores.set(round, score);
  }

  /**
   * Get total score of the player.
   * @returns {number}
   */
  getTotalScore() {
    let sum = 0;
    this._scores.forEach(value => sum += value);
    return sum;
  }
}
