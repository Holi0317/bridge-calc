// @flow
import mapValues from 'lodash/mapValues'
import range from 'lodash/range'
import {toEndedState, toWaitingBidState} from './converter'
import {toFront} from '../../utils'

import type {EndedState, WaitingBidState, WaitingWinState} from './types'
import type {CHANGE_PLAYERS_ACTION} from '../../actions/current-game'

export function changePlayersHandler(state_: WaitingBidState | WaitingWinState, {newNames, rounds, maker}: CHANGE_PLAYERS_ACTION): WaitingBidState | EndedState {
  // Short circuit. When action.rounds is less than current round
  if (rounds < state_.currentRound) {
    const endTime = new Date(state_.startTime.getTime() + 60000)
    const state = toEndedState(state_, endTime)
    state.names = newNames
    state.rounds = rounds
    state.scores = mapValues(state.scores, (score: number[]) => score.slice(0, rounds))
    return state
  }

  const state = toWaitingBidState(state_)
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
