import {t as trans} from '../../helpers/translate'
import {endedState, genMap, waitingBidState} from '../../fixtures/current-game-states'
import {stackInputValidatorSelector, validStackInput, withErrorProp} from '../../../src/selectors/validators/stack-input-validator'

test('null currentGame should be considered as no error', () => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = stackInputValidatorSelector(state, trans)
  expect(actual).toEqual(expected)
})

test('Ended currentGame should be considered as no error', () => {
  const expected = {}
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = stackInputValidatorSelector(state, trans)
  expect(actual).toEqual(expected)
})

test('Error should be selected', () => {
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
  expect(actual).toEqual(expected)
})

test('validStackInput should work', () => {
  const expected = true
  const state = {
    currentGame: null
  }
  const actual = validStackInput(state, trans)
  expect(actual).toBe(expected)
})

test('withErrorProp should work', () => {
  const expected = {
    bid: {},
    win: {}
  }
  const state = {
    currentGame: null
  }
  const actual = withErrorProp(state, trans)
  expect(actual).toEqual(expected)
})
