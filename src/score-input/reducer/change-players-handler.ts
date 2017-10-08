import mapValues from 'lodash-es/mapValues'
import range from 'lodash-es/range'
import {toEndedState, toWaitingBidState} from './converter'
import {toFront} from '../../utils'
import {IEndedState, IWaitingBidState, IWaitingWinState} from './types'
import {IChangePlayersAction} from '../actions/change-players'

export function changePlayersHandler(rawState: IWaitingBidState | IWaitingWinState, {newNames, rounds, maker, time}: IChangePlayersAction): IWaitingBidState | IEndedState {
  // Short circuit. When action.rounds is less than current round
  if (rounds < rawState.currentRound) {
    // tslint:disable-next-line: no-shadowed-variable
    const state = toEndedState(rawState, time)
    state.names = newNames
    state.rounds = rounds
    state.scores = mapValues(state.scores, (score: number[]) => score.slice(0, rounds))
    return state
  }

  const state = toWaitingBidState(rawState)
  state.rounds = rounds

  // Set currentPlayerOrder
  const newPlayerIDList = Object.keys(newNames)
  state.currentPlayerOrder = toFront(newPlayerIDList, newPlayerIDList.indexOf(maker))

  // Change scores
  const oldScores = state.scores
  const freshScores = range(state.currentRound - 1).fill(0) // Score for new players. I am terrible at naming.
  state.scores = mapValues(newNames, (name: string, ID: string): number[] => (
    (ID in oldScores)
      ? oldScores[ID]
      : freshScores
  ))

  // Change bid
  const oldBid = state.bid
  state.bid = mapValues(newNames, (name: string, ID: string): number => (
    (ID in oldBid)
      ? oldBid[ID]
      : 0
  ))

  // Change names field lastly
  state.names = newNames

  return state
}
