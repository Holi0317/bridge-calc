import range from 'lodash-es/range'
import {genMap} from '../../../test-fixtures/current-game-states'
import {isSettingsValid, settingsValidator} from './settings-validator'
import {trans} from '../../utils/translate'

/**
 * Create segment of redux tree for validator to consume
 * @param names - IPlayerMap<string> of names
 */
function makeTree(names) {
  return {
    gameSettings: {
      names
    }
  }
}

test('it should pass for default names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const tree = makeTree(names)
  const expected = {
    names: {},
    misc: null
  }
  const actual = settingsValidator(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should fail if duplicate names exist', () => {
  const names = genMap('John', 'Mary', 'John', 'Joe')
  const tree = makeTree(names)
  const expected = {
    names: {
      a: 'Name cannot be repeated',
      c: 'Name cannot be repeated'
    },
    misc: null
  }
  const actual = settingsValidator(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should fail if one of the name is empty', () => {
  const names = genMap('', 'Mary', 'Henry', 'Joe')
  const tree = makeTree(names)
  const expected = {
    names: {
      a: 'Name cannot be empty'
    },
    misc: null
  }
  const actual = settingsValidator(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should fail if there is no player', () => {
  const names = {}
  const tree = makeTree(names)
  const expected = {
    names: {},
    misc: 'At least 2 players is required for a game'
  }
  const actual = settingsValidator(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should fail if there is only 1 player', () => {
  const names = {'a': 'John'}
  const tree = makeTree(names)
  const expected = {
    names: {},
    misc: 'At least 2 players is required for a game'
  }
  const actual = settingsValidator(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should fail if there are too many players', () => {
  const names = range(53).map(i => i + '').reduce((acc, val) => ({...acc, [val]: val}), {})
  const tree = makeTree(names)
  const expected = {
    names: {},
    misc: 'Too many players. Upper limit is 52 players.'
  }
  const actual = settingsValidator(tree, trans)
  expect(actual).toEqual(expected)
})

test('is valid should pass for default names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const tree = makeTree(names)
  const expected = true
  const actual = isSettingsValid(tree, trans)
  expect(actual).toEqual(expected)
})

test('is valid should return false for erroneous data', () => {
  const names = genMap('', 'Mary', 'Henry', 'Joe')
  const tree = makeTree(names)
  const expected = false
  const actual = isSettingsValid(tree, trans)
  expect(actual).toEqual(expected)
})
