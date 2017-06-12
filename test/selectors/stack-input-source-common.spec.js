import test from 'ava'
import {stackInputSourceCommonSelector} from '../../src/selectors/stack-input-source-common'
import {endedState, genMap} from '../fixtures/current-game-states'

test('Source for null state should have no option', t => {
  const state = {
    currentGame: null
  }
  const expected = {}
  const actual = stackInputSourceCommonSelector(state)
  t.deepEqual(actual, expected, 'No option should be generated')
})

test('Source for ended state should have 1 disabled option', t => {
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
  t.deepEqual(actual, expected, '1 option should be generated')
})
