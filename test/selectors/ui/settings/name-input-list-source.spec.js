import test from 'ava'
import {nameInputListSourceSelector} from '../../../../src/selectors/ui/settings/name-input-list-source'
import {genMap} from '../../../fixtures/current-game-states'

test('Empty array should be selected when player names are empty', t => {
  const state = {
    ui: {
      settings: {
        names: {},
        maker: 'a'
      }
    }
  }
  const expected = []
  const actual = nameInputListSourceSelector(state)
  t.deepEqual(actual, expected, 'Empty array should be selected')
})

test('Array of player names should be selected from settings state', t => {
  const state = {
    ui: {
      settings: {
        names: genMap('John', 'Mary', 'Henry', 'Joe'),
        maker: 'a'
      }
    }
  }
  const expected = [
    ['a', 'John'],
    ['b', 'Mary'],
    ['c', 'Henry'],
    ['d', 'Joe']
  ]
  const actual = nameInputListSourceSelector(state)
  t.deepEqual(actual, expected, 'Array of player names should be selected')
})
