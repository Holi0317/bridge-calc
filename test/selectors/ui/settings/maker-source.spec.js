import {makerSourceSelector} from '../../../../src/selectors/ui/settings/maker-source'
import {genMap} from '../../../fixtures/current-game-states'

test('Empty array should be selected for empty names', () => {
  const state = {
    gameSettings: {
      names: {},
      maker: null
    }
  }
  const expected = []
  const actual = makerSourceSelector(state)
  expect(actual).toEqual(expected)
})

test('Array of dropdown source should be selected for normal names', () => {
  const state = {
    gameSettings: {
      names: genMap('John', 'Mary', 'Henry', 'Joe'),
      maker: 'a'
    }
  }
  const expected = [
    {value: 'a', label: 'John'},
    {value: 'b', label: 'Mary'},
    {value: 'c', label: 'Henry'},
    {value: 'd', label: 'Joe'}
  ]
  const actual = makerSourceSelector(state)
  expect(actual).toEqual(expected)
})
