import {endedState, waitingBidState} from '../../fixtures/current-game-states'
import {endTimeSelector, startTimeSelector} from '../../../src/selectors/current-game/time'

test('Start time selector should select null for null state', () => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = startTimeSelector(state)
  expect(actual).toBe(expected)
})

test('Start time selector should select start time', () => {
  const expected = new Date(0)
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = startTimeSelector(state)
  expect(actual).toEqual(expected)
})

test('End time selector should select null for null state', () => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = endTimeSelector(state)
  expect(actual).toBe(expected)
})

test('End time selector should select null for running state', () => {
  const expected = null
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = endTimeSelector(state)
  expect(actual).toBe(expected)
})

test('End time selector should select time for ended state', () => {
  const expected = new Date(1)
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = endTimeSelector(state)
  expect(actual).toEqual(expected)
})
