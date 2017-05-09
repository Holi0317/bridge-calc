import test from 'ava'
import {t as trans} from '../helpers/test-utils'
import {endedState, waitingBidState} from '../fixtures/current-game-states'
import {gameTitleSelector} from '../../src/selectors/game-title'

test('empty string should be computed for null current game state', t => {
  const expected = ''
  const state = {
    currentGame: null
  }
  const actual = gameTitleSelector(state, trans)
  t.is(actual, expected, 'Empty string should be selected')
})

test('Ended game should have proper title', t => {
  const expected = 'Game over'
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = gameTitleSelector(state, trans)
  t.is(actual, expected, 'Game over should be selected')
})

test('Running state should have title consist of current round and max round', t => {
  const expected = 'Round 2 of 5'
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 2,
      rounds: 5
    }
  }
  const actual = gameTitleSelector(state, trans)
  t.is(actual, expected, 'Round x of y should be selected')
})
