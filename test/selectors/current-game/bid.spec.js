import test from 'ava'
import {bidSelector, strBidSelector} from '../../../src/selectors/current-game/bid'
import {genMap, waitingWinState} from '../../fixtures/current-game-states'

test('Empty object should be selected for null state', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = bidSelector(state)
  t.deepEqual(actual, expected, 'empty object should be selected')
})

test('Bid object should be selected', t => {
  const expected = genMap(0, 1, 0, 1)
  const state = {
    currentGame: {
      ...waitingWinState,
      bid: genMap(0, 1, 0, 1)
    }
  }
  const actual = bidSelector(state)
  t.deepEqual(actual, expected, 'bid object should be selected')
})

test('Empty object should be selected for null state in string selector', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = strBidSelector(state)
  t.deepEqual(actual, expected, 'empty object should be selected')
})

test('Bid object in string form should be selected in string selector', t => {
  const expected = genMap('0', '1', '0', '1')
  const state = {
    currentGame: {
      ...waitingWinState,
      bid: genMap(0, 1, 0, 1)
    }
  }
  const actual = strBidSelector(state)
  t.deepEqual(actual, expected, 'string-ed bid object should be selected')
})
