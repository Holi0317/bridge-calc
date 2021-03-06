import {GameStage} from '../game-stage'
import {IPlayerMap} from '../../types'

/**
 * States that must have regardless of current stage.
 * (Except the stage property)
 */
interface IBaseGameState {
  /** Unique identifier for the game */
  id: string
  /** Number of rounds for this game */
  rounds: number
  /** The time that game has started, in unix timestamp */
  startTime: number

  /** Player name map */
  names: IPlayerMap<string>
  /** Player score map */
  scores: IPlayerMap<number[]>
}

export interface IWaitingBidState extends IBaseGameState {
  stage: typeof GameStage.waitingBid
  /** Current bid */
  bid: IPlayerMap<number>
  /** Order of players for current round */
  currentPlayerOrder: string[]
  /** Current round */
  currentRound: number
}

export interface IWaitingWinState extends IBaseGameState {
  stage: typeof GameStage.waitingWin
  /** Current bid */
  bid: IPlayerMap<number>
  /** Order of players for current round */
  currentPlayerOrder: string[]
  /** Current round */
  currentRound: number
  /** Current win */
  win: IPlayerMap<number>
}

export interface IEndedState extends IBaseGameState {
  stage: typeof GameStage.ended
  /** Time for the game to end, in unix timestamp */
  endTime: number
}

export type GameState =
  | null
  | IWaitingBidState
  | IWaitingWinState
  | IEndedState
