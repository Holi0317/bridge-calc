import {playerTotalScoreSelector} from './player-total-score'
import {genMap, waitingBidState} from '../../../test-fixtures/current-game-states'

test('null should produce empty object', () => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerTotalScoreSelector(state)
  expect(actual).toEqual(expected)
})

test('1st round before start should have 0 score', () => {
  const expected = genMap(0, 0, 0, 0)
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerTotalScoreSelector(state)
  expect(actual).toEqual(expected)
})

test('3rd round should work', () => {
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
  expect(actual).toEqual(expected)
})
