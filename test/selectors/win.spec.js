import test from 'ava'
import {winSelector, strWinSelector} from '../../src/selectors/win'
import {genMap, waitingWinState} from '../fixtures/current-game-states'

test('Empty object should be selected for null state', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = winSelector(state)
  t.deepEqual(actual, expected, 'empty object should be selected')
})

test('Win object should be selected', t => {
  const expected = genMap(0, 1, 0, 1)
  const state = {
    currentGame: {
      ...waitingWinState,
      win: genMap(0, 1, 0, 1)
    }
  }
  const actual = winSelector(state)
  t.deepEqual(actual, expected, 'win object should be selected')
})

test('Empty object should be selected for null state in string selector', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = strWinSelector(state)
  t.deepEqual(actual, expected, 'empty object should be selected')
})

test('Bid object in string form should be selected in string selector', t => {
  const expected = genMap('0', '1', '0', '0')
  const state = {
    currentGame: {
      ...waitingWinState,
      win: genMap(0, 1, 0, 0)
    }
  }
  const actual = strWinSelector(state)
  t.deepEqual(actual, expected, 'string-ed win object should be selected')
})
