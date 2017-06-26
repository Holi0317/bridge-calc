import test from 'ava'
import {t as trans} from '../../helpers/translate'
import {endedState, genMap, waitingBidState} from '../../fixtures/current-game-states'
import {stackInputValidatorSelector, validStackInput, withErrorProp} from '../../../src/selectors/validators/stack-input-validator'

test('null currentGame should be considered as no error', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = stackInputValidatorSelector(state, trans)
  t.deepEqual(actual, expected, 'Empty object should be returned')
})

test('Ended currentGame should be considered as no error', t => {
  const expected = {}
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = stackInputValidatorSelector(state, trans)
  t.deepEqual(actual, expected, 'Empty object should be returned')
})

test('Error should be selected', t => {
  const expected = {
    bid: {d: 'Cannot choose that'}
  }
  const state = {
    currentGame: {
      ...waitingBidState,
      bid: genMap(0, 1, 0, 0)
    }
  }
  const actual = stackInputValidatorSelector(state, trans)
  t.deepEqual(actual, expected, 'Error object should be selected')
})

test('validStackInput should work', t => {
  const expected = true
  const state = {
    currentGame: null
  }
  const actual = validStackInput(state, trans)
  t.is(actual, expected, 'Null current game should be considered as valid')
})

test('withErrorProp should work', t => {
  const expected = {
    bid: {},
    win: {}
  }
  const state = {
    currentGame: null
  }
  const actual = withErrorProp(state, trans)
  t.deepEqual(actual, expected, 'Empty object should be returned')
})
