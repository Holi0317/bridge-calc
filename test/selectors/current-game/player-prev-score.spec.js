import {playerPrevScoreSelector} from '../../../src/selectors/current-game/player-prev-score'
import {genMap, waitingBidState} from '../../fixtures/current-game-states'

test('null state should produce empty object', () => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerPrevScoreSelector(state)
  expect(actual).toEqual(expected)
})

test('First round should produce 0 score', () => {
  const expected = genMap(0, 0, 0, 0)
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerPrevScoreSelector(state)
  expect(actual).toEqual(expected)
})

test('Successful selection on second round', () => {
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
  expect(actual).toEqual(expected)
})
