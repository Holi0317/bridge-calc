import {defaultState} from '../../../fixtures/settings-state'
import {namesSelector} from '../../../../src/selectors/ui/settings/names'

test('names property should be selected from ui/settings', () => {
  const state = {
    ui: {
      settings: {
        ...defaultState
      }
    }
  }
  const expected = {}
  const actual = namesSelector(state)
  expect(actual).toEqual(expected)
})
