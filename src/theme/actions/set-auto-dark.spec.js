import {setAutoDarkAction} from './set-auto-dark'
import {ActionTypes} from '../../action-types'

test('it should return correct action for disabling', () => {
  const actual = setAutoDarkAction(false)
  const expected = {
    type: ActionTypes.SET_AUTO_DARK,
    payload: false
  }
  expect(actual).toEqual(expected)
})

test('it should return correct action for enabling', () => {
  const actual = setAutoDarkAction(true)
  const expected = {
    type: ActionTypes.SET_AUTO_DARK,
    payload: true
  }
  expect(actual).toEqual(expected)
})
