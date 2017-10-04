import {nameInputListSourceSelector} from '../../../../src/selectors/ui/settings/name-input-list-source'
import {genMap} from '../../../../test-fixtures/current-game-states'

test('Empty array should be selected when player names are empty', () => {
  const state = {
    gameSettings: {
      names: {},
      maker: 'a'
    }
  }
  const expected = []
  const actual = nameInputListSourceSelector(state)
  expect(actual).toEqual(expected)
})

test('Array of player names should be selected from settings state', () => {
  const state = {
    gameSettings: {
      names: genMap('John', 'Mary', 'Henry', 'Joe'),
      maker: 'a'
    }
  }
  const expected = [
    ['a', 'John'],
    ['b', 'Mary'],
    ['c', 'Henry'],
    ['d', 'Joe']
  ]
  const actual = nameInputListSourceSelector(state)
  expect(actual).toEqual(expected)
})
