import {IScoreboardSchema} from '../../storage/schema'
import {last} from '../../utils'

/**
 * Calculate score of this round from given parameters.
 * Special case: If bid and win are undefined or is null, score would be 0.
 *
 * @param bid - Number of bid stack given
 * @param win - Number of win gain stack
 * @return Score of the player at that round
 */
function calculateScore(bid: string | null, win: string | null): number {
  if (bid == null || win == null) {
    return 0
  } else if (bid === win) {
    return (+bid) ** 2 + 10
  } else {
    return -((+win - +bid) ** 2)
  }
}

/**
 * Scoreboard that controls one player's score in the whole game.
 */
export class Scoreboard {
  /**
   * Current bid.
   * See setScore method for details.
   */
  public bid: string | null
  /**
   * Current win.
   * See setScore method for details.
   */
  public win: string | null

  /**
   * Score for the previous round of game.
   * 0 If there is no previous round.
   */
  public prevScore: number

  /**
   * Sum of all score.
   * Call updateTotalScore() if need to recalculate.
   */
  public totalScore: number

  /**
   * Score map for this player.
   * Format should be round name -> score.
   * Use methods of this class for retrieving score unless there is no other ways to get it
   */
  private _scores: Map<string, number>

  constructor() {
    this.reset()
  }

  /**
   * Reset and destroy scoreboard data.
   */
  public reset() {
    this.bid = null
    this.win = null
    this._scores = new Map()
    this.prevScore = 0
    this.totalScore = 0
  }

  /**
   * Get score of a player on specified round.
   * If score data does not exists for that round, null is returned.
   * @param round
   * @returns ?number
   */
  public getScore(round: string): number | null {
    const score = this._scores.get(round)
    return (score == null) ? null : score
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
  public calcScore(round: string, bid = this.bid, win = this.win): void {
    this.bid = null
    this.win = null

    const score = calculateScore(bid, win)
    this._scores.set(round, score)
    this.prevScore = score
    this.totalScore += score
  }

  /**
   * In usual case, totalScore is directly mutated by calcScore and just add up latest score.
   * This method refresh total score by recalculating the sum of all score.
   */
  public updateTotalScore() {
    let sum = 0
    this._scores.forEach((value) => sum += value)
    this.totalScore = sum
  }

  public dump(): IScoreboardSchema {
    return {
      bid: this.bid,
      scores: Array.from(this._scores),
      win: this.win
    }
  }

  public load(data: IScoreboardSchema) {
    this.reset()

    this.bid = data.bid
    this.win = data.win
    this._scores = new Map(data.scores)

    const lastRound = last(data.scores)
    this.prevScore = lastRound ? lastRound[1] : 0

    this.updateTotalScore()
  }
}
