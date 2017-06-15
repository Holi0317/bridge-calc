import test from 'ava'
import {playerPrevScoreSelector} from '../../src/selectors/player-prev-score'
import {genMap, waitingBidState} from '../fixtures/current-game-states'

test('null state should produce empty object', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerPrevScoreSelector(state)
  t.deepEqual(actual, expected, 'empty object should be selected')
})

test('First round should produce 0 score', t => {
  const expected = genMap(0, 0, 0, 0)
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerPrevScoreSelector(state)
  t.deepEqual(actual, expected, 'All player should have 0 as previous score')
})

test('Successful selection on second round', t => {
  const expected = genMap(-1, -1, 10, 10)
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ['c', 'd', 'a', 'b'],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    }
  }
  const actual = playerPrevScoreSelector(state)
  t.deepEqual(actual, expected, 'Previous score should be selected')
})
