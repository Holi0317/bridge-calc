// @flow
import {GameStage} from '../../game-stage'

import type {PlayerMap} from '../../types'

/**
 * States that must have regardless of current stage.
 * (Except the stage property)
 */
type BaseGameState = {
  /** Number of rounds for this game */
  rounds: number,
  /** The time that game has started */
  startTime: Date,

  /** Player name map */
  names: PlayerMap<string>,
  /** Player score map */
  scores: PlayerMap<number[]>
}

export type WaitingBidState = BaseGameState & {
  stage: typeof GameStage.waitingBid,
  /** Current bid */
  bid: PlayerMap<number>,
  /** Order of players for current round */
  currentPlayerOrder: string[],
  /** Current round */
  currentRound: number
}

export type WaitingWinState = WaitingBidState & {
  stage: typeof GameStage.waitingWin,
  /** Current win */
  win: PlayerMap<number>
}

export type EndedState = BaseGameState & {
  stage: typeof GameStage.ended,
  endTime: Date
}

export type GameState =
  | null
  | WaitingBidState
  | WaitingWinState
  | EndedState
