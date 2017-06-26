import test from 'ava'
import {playerTotalScoreSelector} from '../../../src/selectors/current-game/player-total-score'
import {genMap, waitingBidState} from '../../fixtures/current-game-states'

test('null should produce empty object', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerTotalScoreSelector(state)
  t.deepEqual(actual, expected, 'Empty object should be produced')
})

test('1st round before start should have 0 score', t => {
  const expected = genMap(0, 0, 0, 0)
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerTotalScoreSelector(state)
  t.deepEqual(actual, expected, '0 scores object should be produced')
})

test('3rd round should work', t => {
  const expected = genMap(9, -2, 20, 9)
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ['c', 'd', 'a', 'b'],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    }
  }
  const actual = playerTotalScoreSelector(state)
  t.deepEqual(actual, expected, 'total score should be selected')
})
