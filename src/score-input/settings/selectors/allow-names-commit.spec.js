import {genMap} from '../../../../test-fixtures/current-game-states'
import {allowNamesCommitSelector} from './allow-names-commit'
import {trans} from '../../../utils/translate'

/**
 * Build part of redux store tree for testing
 * @param settingsNames - `state.settings.names`
 * @param names - `state.currentGame.names`
 */
function buildTree(settingsNames, names) {
  return {
    gameSettings: {names: settingsNames},
    currentGame: {names}
  }
}

test('it should allow change for valid and changed names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const settingsNames = genMap('John', 'Joe', 'Henry', 'Mary')
  const tree = buildTree(settingsNames, names)
  const expected = true
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for unchanged names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const tree = buildTree(names, names)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for invalid names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const settingsNames = genMap('John', 'Mary', 'Henry', '')
  const tree = buildTree(settingsNames, names)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for unchanged and invalid names (Impossible)', () => {
  const names = genMap('', 'Mary', 'Henry', 'Joe')
  const tree = buildTree(names, names)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})
