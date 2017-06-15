import test from 'ava'
import {playerScoresSelector} from '../../src/selectors/player-scores'
import {genMap, waitingBidState} from '../fixtures/current-game-states'

test('null should produce empty object', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerScoresSelector(state)
  t.deepEqual(actual, expected, 'Empty object should be selected')
})

test('player score should be selected', t => {
  const expected = genMap([], [], [], [])
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerScoresSelector(state)
  t.deepEqual(actual, expected, 'Player scores should be selected')
})
