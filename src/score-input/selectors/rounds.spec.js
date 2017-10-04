import {roundsSelector} from './rounds'
import {waitingBidState} from '../../../test-fixtures/current-game-states'

test('null should be selected if currentGame is null', () => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = roundsSelector(state)
  expect(actual).toBe(expected)
})

test('currentRound should be selected', () => {
  const expected = 13
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = roundsSelector(state)
  expect(actual).toBe(expected)
})
