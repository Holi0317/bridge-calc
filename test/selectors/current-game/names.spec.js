import {namesSelector} from '../../../src/selectors/current-game/names'
import {genMap, waitingBidState} from '../../fixtures/current-game-states'

test('empty object should be selected if currentGame is null', () => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = namesSelector(state)
  expect(actual).toEqual(expected)
})

test('Names should be selected', () => {
  const expected = genMap('John', 'Mary', 'Henry', 'Joe')
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = namesSelector(state)
  expect(actual).toEqual(expected)
})
