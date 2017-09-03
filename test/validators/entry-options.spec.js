import {t as trans} from '../helpers/translate'
import {defaultOptions} from '../fixtures/entry-options'
import {entryOptionsValidator as validator} from '../../src/validators/entry-options'

test('validation should pass with default options', () => {
  const options = {
    ...defaultOptions
  }
  const actual = validator(options, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('validator should fail when there is no player', () => {
  const options = {
    ...defaultOptions,
    playerNames: []
  }
  const actual = validator(options, trans)
  const expected = {
    misc: 'At least 2 players is required for a game'
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when there is only 1 player', () => {
  const options = {
    ...defaultOptions,
    playerNames: ['DPGJW']
  }
  const actual = validator(options, trans)
  const expected = {
    misc: 'At least 2 players is required for a game'
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when a player name is empty', () => {
  const options = {
    ...defaultOptions,
    playerNames: ['John', 'Mary', '', 'Joe']
  }
  const actual = validator(options, trans)
  const expected = {
    playerNames: ['', '', 'Name cannot be empty', '']
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when there is repeated name', () => {
  const options = {
    ...defaultOptions,
    playerNames: ['', 'John', 'John', 'Mary']
  }
  const actual = validator(options, trans)
  const expected = {
    playerNames: ['Name cannot be empty', 'Name cannot be repeated', 'Name cannot be repeated', '']
  }
  expect(actual).toEqual(expected)
})
