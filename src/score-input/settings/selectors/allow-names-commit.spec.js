import {genMap} from '../../../../test-fixtures/current-game-states'
import {allowNamesCommitSelector} from './allow-names-commit'
import {trans} from '../../../utils/translate'

/**
 * Build part of redux store tree for testing
 * @param settingsNames - `state.settings.names`
 * @param names - `state.currentGame.names`
 * @param makerDirty - `state.gameSettings.makerDirty`
 */
function buildTree(settingsNames, names, makerDirty) {
  return {
    gameSettings: {names: settingsNames, makerDirty},
    currentGame: {names}
  }
}

test('it should allow change for valid and changed names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const settingsNames = genMap('John', 'Joe', 'Henry', 'Mary')
  const makerDirty = false
  const tree = buildTree(settingsNames, names, makerDirty)
  const expected = true
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for unchanged names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const makerDirty = false
  const tree = buildTree(names, names, makerDirty)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for invalid names', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const settingsNames = genMap('John', 'Mary', 'Henry', '')
  const makerDirty = false
  const tree = buildTree(settingsNames, names, makerDirty)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for unchanged and invalid names (Impossible)', () => {
  const names = genMap('', 'Mary', 'Henry', 'Joe')
  const makerDirty = false
  const tree = buildTree(names, names, makerDirty)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})

test('it should disallow change for mutated maker selector', () => {
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const settingsNames = genMap('John', 'Joe', 'Henry', 'Mary')
  const makerDirty = true
  const tree = buildTree(settingsNames, names, makerDirty)
  const expected = false
  const actual = allowNamesCommitSelector(tree, trans)
  expect(actual).toEqual(expected)
})
