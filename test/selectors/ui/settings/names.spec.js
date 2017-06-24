import test from 'ava'
import {defaultState} from '../../../fixtures/settings-state'
import {namesSelector} from '../../../../src/selectors/ui/settings/names'

test('names property should be selected from ui/settings', t => {
  const state = {
    ui: {
      settings: {
        ...defaultState
      }
    }
  }
  const expected = {}
  const actual = namesSelector(state)
  t.deepEqual(actual, expected, 'Names should be selected')
})
