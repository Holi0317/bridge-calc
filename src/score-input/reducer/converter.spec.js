import {toWaitingBidState, toWaitingWinState, toEndedState} from './converter'
import {endedState, waitingBidState, waitingWinState} from '../../../test-fixtures/current-game-states'

test('toWaitingBidState should remain state unchanged for waitingBid state', () => {
  const state = {
    ...waitingBidState
  }
  const expected = {
    ...waitingBidState
  }
  const actual = toWaitingBidState(state)
  expect(actual).toEqual(expected)
})

test('toWaitingBidState should revert waitingWin state to waitingBid', () => {
  const state = {
    ...waitingWinState
  }
  const expected = {
    ...waitingBidState
  }
  const actual = toWaitingBidState(state)
  expect(actual).toEqual(expected)
})

test('toWaitingWinState should keep state unchanged for default waitingWin', () => {
  const state = {
    ...waitingWinState
  }
  const expected = {
    ...waitingWinState
  }
  const actual = toWaitingWinState(state)
  expect(actual).toEqual(expected)
})

test('toWaitingWinState should convert waitingBid to waitingWin', () => {
  const state = {
    ...waitingBidState
  }
  const expected = {
    ...waitingWinState
  }
  const actual = toWaitingWinState(state)
  expect(actual).toEqual(expected)
})

test('toEndedState should end waitingBid', () => {
  const state = {
    ...waitingBidState
  }
  const expected = {
    ...endedState,
    endTime: new Date(1)
  }
  const actual = toEndedState(state, new Date(1))
  expect(actual).toEqual(expected)
})

test('toEndedState should end waitingWin', () => {
  const state = {
    ...waitingWinState
  }
  const expected = {
    ...endedState,
    endTime: new Date(1)
  }
  const actual = toEndedState(state, new Date(1))
  expect(actual).toEqual(expected)
})
