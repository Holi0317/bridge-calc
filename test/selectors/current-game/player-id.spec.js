import {playerIDSelector} from '../../../src/selectors/current-game/player-id'
import {waitingBidState} from '../../fixtures/current-game-states'

test('Empty array should be selected when state is null', () => {
  const state = {
    currentGame: null
  }
  const expected = []
  const actual = playerIDSelector(state)
  expect(actual).toEqual(expected)
})

test('Player IDs should be selected', () => {
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const expected = ['a', 'b', 'c', 'd']
  const actual = playerIDSelector(state)
  expect(actual).toEqual(expected)
})
