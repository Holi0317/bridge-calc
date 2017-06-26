import test from 'ava'
import {playerOrderSelector} from '../../../src/selectors/current-game/player-order'
import {endedState, waitingBidState} from '../../fixtures/current-game-states'

test('empty array should be selected for null state', t => {
  const expected = []
  const state = {
    currentGame: null
  }
  const actual = playerOrderSelector(state)
  t.deepEqual(actual, expected, 'empty array should be selected')
})

test('empty array should be selected for ended state', t => {
  const expected = []
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = playerOrderSelector(state)
  t.deepEqual(actual, expected, 'empty array should be selected')
})

test('player order should be selected', t => {
  const expected = ['a', 'b', 'c', 'd']
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerOrderSelector(state)
  t.deepEqual(actual, expected, 'empty array should be selected')
})
