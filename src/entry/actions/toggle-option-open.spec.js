import {toggleOptionOpenAction} from './toggle-option-open'
import {ActionTypes} from '../../action-types'

test('it should return toggle option open action', () => {
  const expected = {
    type: ActionTypes.TOGGLE_OPTION_OPEN
  }
  const actual = toggleOptionOpenAction()
  expect(actual).toEqual(expected)
})
