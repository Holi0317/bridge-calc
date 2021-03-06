import {stackInputSourceCommonSelector} from './stack-input-source-common'
import {endedState, genMap} from '../../../test-fixtures/current-game-states'

test('Source for null state should have no option', () => {
  const state = {
    currentGame: null
  }
  const expected = {}
  const actual = stackInputSourceCommonSelector(state)
  expect(actual).toEqual(expected)
})

test('Source for ended state should have 1 disabled option', () => {
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const source = [
    {value: 0, label: '0', disabled: true}
  ]
  const expected = genMap(source, source, source, source)
  const actual = stackInputSourceCommonSelector(state)
  expect(actual).toEqual(expected)
})
