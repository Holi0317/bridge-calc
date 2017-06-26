import test from 'ava'
import {playerIDSelector} from '../../../src/selectors/current-game/player-id'
import {waitingBidState} from '../../fixtures/current-game-states'

test('Empty array should be selected when state is null', t => {
  const state = {
    currentGame: null
  }
  const expected = []
  const actual = playerIDSelector(state)
  t.deepEqual(actual, expected, 'Empty array should be selected')
})

test('Player IDs should be selected', t => {
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const expected = ['a', 'b', 'c', 'd']
  const actual = playerIDSelector(state)
  t.deepEqual(actual, expected, 'Player IDs should be selected')
})
