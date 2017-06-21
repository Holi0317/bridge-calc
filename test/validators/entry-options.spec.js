import test from 'ava'
import {t as trans} from '../helpers/translate'
import {defaultOptions} from '../fixtures/entry-options'
import {entryOptionsValidator as validator} from '../../src/validators/entry-options'

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

test('validator should fail when there is repeated name', t => {
  const options = {
    ...defaultOptions,
    playerNames: ['', 'John', 'John', 'Mary']
  }
  const actual = validator(options, trans)
  const expected = {
    playerNames: ['Name cannot be empty', 'Name cannot be repeated', 'Name cannot be repeated', '']
  }
  t.deepEqual(actual, expected, 'playerNames should include error messages')
})
