import {ActionTypes} from '../../action-types'
import {toggleDarkAction} from './toggle-dark'

test('it should return toggle dark action', () => {
  const expected = {
    type: ActionTypes.TOGGLE_DARK
  }
  const actual = toggleDarkAction()
  expect(actual).toEqual(expected)
})
