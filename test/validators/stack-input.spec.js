import {t as trans} from '../helpers/translate'
import {genMap} from '../fixtures/current-game-states'
import {stackInputValidator as validator} from '../../src/validators/stack-input'

const baseOptions = {
  currentRound: 1,
  lastPlayerID: 'd'
}

test('Empty value should pass validation', () => {
  const options = {
    ...baseOptions
  }
  const actual = validator(options, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('Correct value should pass validation', () => {
  const options = {
    ...baseOptions,
    bid: genMap(0, 0, 0, 0),
    win: genMap(1, 0, 0, 0)
  }
  const actual = validator(options, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('validator should fail when sum of bid equals to current round number', () => {
  const options = {
    ...baseOptions,
    bid: genMap(0, 1, 0, 0)
  }
  const actual = validator(options, trans)
  const expected = {
    bid: {d: 'Cannot choose that'}
  }
  expect(actual).toEqual(expected)
})

test('validator should fail on win when sum of stacks is smaller than current round number', () => {
  const options = {
    ...baseOptions,
    win: genMap(0, 0, 0, 0)
  }
  const actual = validator(options, trans)
  const msg = 'Too less stacks'
  const expected = {
    win: genMap(msg, msg, msg, msg)
  }
  expect(actual).toEqual(expected)
})

test('validator should fail on win stacks that exceed current round number', () => {
  const options = {
    ...baseOptions,
    win: genMap(1, 1, 0, 0)
  }
  const actual = validator(options, trans)
  const msg = 'Too many stacks'
  const expected = {
    win: genMap(msg, msg, msg, msg)
  }
  expect(actual).toEqual(expected)
})

test('validator should fail both bid and win when both of them have error data', () => {
  const options = {
    ...baseOptions,
    bid: genMap(0, 0, 1, 0),
    win: genMap(1, 0, 0, 1)
  }
  const actual = validator(options, trans)
  const msg = 'Too many stacks'
  const expected = {
    bid: {d: 'Cannot choose that'},
    win: genMap(msg, msg, msg, msg)
  }
  expect(actual).toEqual(expected)
})

test('validator should pass on empty bid object', () => {
  const options = {
    ...baseOptions,
    bid: {}
  }
  const actual = validator(options, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('validator should pass on empty win object', () => {
  const options = {
    ...baseOptions,
    win: {}
  }
  const actual = validator(options, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})
