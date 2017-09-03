import {playerScoresSelector} from '../../../src/selectors/current-game/player-scores'
import {genMap, waitingBidState} from '../../fixtures/current-game-states'

test('null should produce empty object', () => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerScoresSelector(state)
  expect(actual).toEqual(expected)
})

test('player score should be selected', () => {
  const expected = genMap([], [], [], [])
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerScoresSelector(state)
  expect(actual).toEqual(expected)
})
