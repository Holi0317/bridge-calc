import test from 'ava'
import {currentRoundSelector} from '../../src/selectors/current-round'
import {endedState, waitingBidState} from '../fixtures/current-game-states'

test('null should be selected if currentGame is null', t => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = currentRoundSelector(state)
  t.is(actual, expected, 'null should be returned')
})

test('null should be selected if currentRound does not exist', t => {
  const expected = null
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = currentRoundSelector(state)
  t.is(actual, expected, 'null should be selected')
})

test('currentRound should be selected', t => {
  const expected = 1
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = currentRoundSelector(state)
  t.is(actual, expected, 'current round should be selected')
})
