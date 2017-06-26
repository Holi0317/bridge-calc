import test from 'ava'
import {namesSelector} from '../../../src/selectors/current-game/names'
import {genMap, waitingBidState} from '../../fixtures/current-game-states'

test('empty object should be selected if currentGame is null', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = namesSelector(state)
  t.deepEqual(actual, expected, 'Empty object should be returned')
})

test('Names should be selected', t => {
  const expected = genMap('John', 'Mary', 'Henry', 'Joe')
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = namesSelector(state)
  t.deepEqual(actual, expected, 'Names should be selected')
})
