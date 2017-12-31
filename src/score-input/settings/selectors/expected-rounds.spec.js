import range from 'lodash-es/range'
import {genMap} from '../../../../test-fixtures/current-game-states'
import {expectedRoundsSelector} from './expected-rounds'

/**
 * Construct part of redux store tree for testing
 * @param names - `state.gameSettings.names`
 */
function makeTree(names) {
  return {
    gameSettings: {names}
  }
}

test('it should calculate rounds correctly 1', () => {
  const expected = 13
  const names = genMap('John', 'Mary', 'Henry', 'Joe')
  const tree = makeTree(names)
  const actual = expectedRoundsSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should calculate rounds correctly 2', () => {
  const expected = 10
  const names = {
    ...genMap('John', 'Mary', 'Henry', 'Joe'),
    'e': 'DPGJW'
  }
  const tree = makeTree(names)
  const actual = expectedRoundsSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should produce 0 for no player', () => {
  const expected = 0
  const names = {}
  const tree = makeTree(names)
  const actual = expectedRoundsSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should produce 0 for 1 player', () => {
  const expected = 0
  const names = {'a': 'John'}
  const tree = makeTree(names)
  const actual = expectedRoundsSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should produce 0 for too many players', () => {
  const expected = 0
  const names = range(53).map(i => i + '').reduce((acc, val) => ({...acc, [val]: val}), {})
  const tree = makeTree(names)
  const actual = expectedRoundsSelector(tree)
  expect(actual).toEqual(expected)
})
