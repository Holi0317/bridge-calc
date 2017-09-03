import {waitingBidState} from '../../fixtures/current-game-states'
import {roundsSelector} from '../../../src/selectors/current-game/rounds'

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
