import {IEndedState, IWaitingBidState, IWaitingWinState} from '../score-input/reducer/types'

/**
 * Represent a previous game (Ended or paused)
 */
export type PrevGameEntry =
  | IWaitingBidState
  | IWaitingWinState
  | IEndedState
