import range from 'lodash-es/range'
import {trans} from '../utils/translate'
import {entryOptionsValidator as validator, isEntryOptionsValid} from './entry-validator'

/**
 * Create part of redux store tree for validator to consume.
 * @param playerNames {string[]}
 */
function makeTree(playerNames) {
  return {
    ui: {
      entry: {
        playerNames
      }
    }
  }
}

const defaultNames = ['John', 'Mary', 'Henry', 'Joe']

test('validation should pass with default options', () => {
  const options = makeTree(defaultNames)
  const actual = validator(options, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('validator should fail when there is no player', () => {
  const options = makeTree([])
  const actual = validator(options, trans)
  const expected = {
    misc: 'At least 2 players is required for a game'
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when there is only 1 player', () => {
  const options = makeTree(['DPGJW'])
  const actual = validator(options, trans)
  const expected = {
    misc: 'At least 2 players is required for a game'
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when there is too many players', () => {
  const options = makeTree(range(53).map(i => i + ''))
  const actual = validator(options, trans)
  const expected = {
    misc: 'Too many players. Upper limit is 52 players.'
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when a player name is empty', () => {
  const options = makeTree(['John', 'Mary', '', 'Joe'])
  const actual = validator(options, trans)
  const expected = {
    playerNames: ['', '', 'Name cannot be empty', '']
  }
  expect(actual).toEqual(expected)
})

test('validator should fail when there is repeated name', () => {
  const options = makeTree(['', 'John', 'John', 'Mary'])
  const actual = validator(options, trans)
  const expected = {
    playerNames: ['Name cannot be empty', 'Name cannot be repeated', 'Name cannot be repeated', '']
  }
  expect(actual).toEqual(expected)
})

test('is valid should be true when default options is passed in', () => {
  const options = makeTree(defaultNames)
  const actual = isEntryOptionsValid(options, trans)
  const expected = true
  expect(actual).toEqual(expected)
})

test('is valid should be false when erroneous options is passed in', () => {
  const options = makeTree(['', 'John', 'John', 'Mary'])
  const actual = isEntryOptionsValid(options, trans)
  const expected = false
  expect(actual).toEqual(expected)
})
