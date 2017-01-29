import type {PlayerID} from './player-manager-service';

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
 * Service that control scores of current game (all rounds)
 */
export class ScoreboardService {
  /**
   * 2D Map for all scores in every round.
   * First dimension is mapped according to player ID.
   * Second dimension is mapped from round name to score.
   */
  private _score: Map<PlayerID, Map<string, number>>;

  constructor() {
    this.reset();
  }

  /**
   * Reset and destroy scoreboard data.
   */
  reset() {
    this._score = new Map();
  }

  /**
   * Get score of a player on specified round.
   * If score data does not exists for that round, null is returned.
   * @throws ReferenceError - player does not exists in scoreboard.
   * @param playerID
   * @param round
   * @returns
   */
  getScore(playerID: PlayerID, round: string): ?number {
    const scores = this._score.get(playerID);
    if (!scores) {
      throw new ReferenceError(`Player ID:${playerID} not found in scoreboard`);
    }
    return scores.get(round) || null;
  }

  /**
   * Set score for a player on a round. If score already exists, it will be override.
   * Special case: omit bid and win parameters for setting 0 mark.
   * @param playerID
   * @param round
   * @param bid
   * @param win
   */
  setScore(playerID: PlayerID, round: string, bid: ?number, win: ?number) {
    const score = calculateScore(bid, win);
    let scores: Map<string, number>;
    if (!this._score.has(playerID)) {
      scores = new Map();
      this._score.set(playerID, scores);
    } else {
      this._score.get(playerID);
    }
    scores.set(round, score);
  }

  /**
   * Get total score of a player.
   * Throws
   * @param playerID
   * @returns {number}
   */
  getTotalScore(playerID: PlayerID) {
    const scores = this._score.get(playerID);
    if (!scores) {
      throw new ReferenceError(`Player ID:${playerID} not found in scoreboard`);
    }
    let sum = 0;
    scores.forEach(value => sum += value);
    return sum;
  }

  /**
   * Remove player from scoreboard.
   * @throws ReferenceError - player does not exists in scoreboard.
   * @param playerID
   */
  removePlayer(playerID: PlayerID) {
    if (!this._score.has(playerID)) {
      throw new ReferenceError(`Player ID:${playerID} not found in scoreboard`);
    }
    this._score.delete(playerID);
  }
}
