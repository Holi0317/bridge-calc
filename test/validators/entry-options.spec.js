import test from 'ava'
import {t as trans} from '../helpers/translate'
import {defaultOptions} from '../fixtures/entry-options'
import {entryOptionsValidator as validator, isInteger} from '../../src/validators/entry-options'

test('isInteger should pass if given string is an integer', t => {
  const actual = isInteger('10')
  t.true(actual, 'Test should pass on integer')
})

test('isInteger should fail if given a float', t => {
  const actual = isInteger('5.5')
  t.false(actual, 'Test should fail on float')
})

test('isInteger should fail if given a negative', t => {
  const actual = isInteger('-10')
  t.false(actual, 'Test should fail on negative number')
})

test('isInteger should pass if given 0', t => {
  const actual = isInteger('0')
  t.true(actual, 'Test should fail on 0')
})

test('isInteger should fail if the first char is 0', t => {
  const actual = isInteger('05')
  t.false(actual, 'Test should fail on 05')
})

test('isInteger should fail if there is non-number character passed in', t => {
  const actual = isInteger('8e')
  t.false(actual, 'Test should fail on scientific notation')
})

test('isInteger should fail on non-number argument', t => {
  const actual = isInteger('aaa')
  t.false(actual, 'Test should fail on aaa')
})

test('isInteger should pass on empty string', t => {
  const actual = isInteger('')
  t.true(actual, 'Empty string should pass')
})

test('validation should pass with default options', t => {
  const options = {
    ...defaultOptions
  }
  const actual = validator(options, trans)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})

test('validator should fail when there is no player', t => {
  const options = {
    ...defaultOptions,
    playerNames: []
  }
  const actual = validator(options, trans)
  const expected = {
    misc: 'At least 2 players is required for a game'
  }
  t.deepEqual(actual, expected, 'misc should include an error message')
})

test('validator should fail when there is only 1 player', t => {
  const options = {
    ...defaultOptions,
    playerNames: ['DPGJW']
  }
  const actual = validator(options, trans)
  const expected = {
    misc: 'At least 2 players is required for a game'
  }
  t.deepEqual(actual, expected, 'misc should include an error message')
})

test('validator should fail when a player name is empty', t => {
  const options = {
    ...defaultOptions,
    playerNames: ['John', 'Mary', '', 'Joe']
  }
  const actual = validator(options, trans)
  const expected = {
    playerNames: ['', '', 'Name cannot be empty', '']
  }
  t.deepEqual(actual, expected, 'playerNames should include an error message')
})
