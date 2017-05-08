import test from 'ava'
import {t as trans} from '../helpers/test-utils'
import {genMap} from '../fixtures/current-game-states'
import {stackInputValidator as validator} from '../../src/validators/stack-input'

const baseOptions = {
  currentRound: 1,
  lastPlayerID: 'd'
}

test('Empty value should pass validation', t => {
  const options = {
    ...baseOptions
  }
  const actual = validator(options, trans)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})

test('Correct type and value should pass validation', t => {
  const options = {
    ...baseOptions,
    bid: genMap(0, 0, 0, 0),
    win: genMap(1, 0, 0, 0)
  }
  const actual = validator(options, trans)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})

test('validator should fail on negative bid', t => {
  const options = {
    ...baseOptions,
    bid: genMap(0, -1, 1, 1)
  }
  const actual = validator(options, trans)
  const expected = {
    bid: {b: 'Bid must be an integer'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in b')
})

test('validator should fail on float bid', t => {
  const options = {
    ...baseOptions,
    bid: genMap(0, 1, 0.5, 1)
  }
  const actual = validator(options, trans)
  const expected = {
    bid: {c: 'Bid must be an integer'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in c')
})

test('validator should fail when sum of bid equals to current round number', t => {
  const options = {
    ...baseOptions,
    bid: genMap(0, 1, 0, 0)
  }
  const actual = validator(options, trans)
  const expected = {
    bid: {d: 'Cannot choose that'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in d')
})

test('validator should fail when bid is larger than current round number', t => {
  const options = {
    ...baseOptions,
    bid: genMap(3, 0, 0, 0)
  }
  const actual = validator(options, trans)
  const expected = {
    bid: {a: 'Way too many cards'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in a')
})

test('validator should fail on negative win', t => {
  const options = {
    ...baseOptions,
    win: genMap(0, -1, 1, 1)
  }
  const actual = validator(options, trans)
  const expected = {
    win: {b: 'Win must be an integer'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in b')
})

test('validator should fail on float win', t => {
  const options = {
    ...baseOptions,
    win: genMap(0.5, 0, 0, 0)
  }
  const actual = validator(options, trans)
  const expected = {
    win: {a: 'Win must be an integer'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in a')
})

test('validator should fail when one win is larger than current round number', t => {
  const options = {
    ...baseOptions,
    win: genMap(1, 0, 0, 5)
  }
  const actual = validator(options, trans)
  const expected = {
    win: {d: 'Way too many cards'}
  }
  t.deepEqual(actual, expected, 'Error message should exist in d')
})

test('validator should fail on win when sum of stacks is smaller than current round number', t => {
  const options = {
    ...baseOptions,
    win: genMap(0, 0, 0, 0)
  }
  const actual = validator(options, trans)
  const msg = 'Too less stacks'
  const expected = {
    win: genMap(msg, msg, msg, msg)
  }
  t.deepEqual(actual, expected, 'Error message should exist in all players')
})

test('validator should fail on win stacks that exceed current round number', t => {
  const options = {
    ...baseOptions,
    win: genMap(1, 1, 0, 0)
  }
  const actual = validator(options, trans)
  const msg = 'Too many stacks'
  const expected = {
    win: genMap(msg, msg, msg, msg)
  }
  t.deepEqual(actual, expected, 'Error message should exist in all players')
})

test('validator should fail both bid and win when both of them have error data', t => {
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
  t.deepEqual(actual, expected, 'Error message should exist in all players')
})

test('validator should pass on empty bid object', t => {
  const options = {
    ...baseOptions,
    bid: {}
  }
  const actual = validator(options, trans)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})

test('validator should pass on empty win object', t => {
  const options = {
    ...baseOptions,
    win: {}
  }
  const actual = validator(options, trans)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})
