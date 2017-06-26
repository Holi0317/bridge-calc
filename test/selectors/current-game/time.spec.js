import test from 'ava'
import {endedState, waitingBidState} from '../../fixtures/current-game-states'
import {endTimeSelector, startTimeSelector} from '../../../src/selectors/current-game/time'

test('Start time selector should select null for null state', t => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = startTimeSelector(state)
  t.is(actual, expected, 'null should be selected')
})

test('Start time selector should select start time', t => {
  const expected = new Date(0)
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = startTimeSelector(state)
  t.deepEqual(actual, expected, 'start time should be selected')
})

test('End time selector should select null for null state', t => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = endTimeSelector(state)
  t.is(actual, expected, 'null should be selected')
})

test('End time selector should select null for running state', t => {
  const expected = null
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = endTimeSelector(state)
  t.is(actual, expected, 'null should be selected')
})

test('End time selector should select time for ended state', t => {
  const expected = new Date(1)
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = endTimeSelector(state)
  t.deepEqual(actual, expected, 'null should be selected')
})
