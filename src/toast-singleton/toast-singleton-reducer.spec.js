import {toastSingletonReducer} from './toast-singleton-reducer'
import {showToastAction} from './actions/show-toast'
import {closeToastAction} from './actions/close-toast'

test('default state', () => {
  const state = undefined
  const action = {
    type: '#NULL'
  }
  const expected = {
    open: false,
    message: '',
    autoHideDuration: 3000
  }
  const actual = toastSingletonReducer(state, action)
  expect(actual).toEqual(expected)
})

test('SHOW_TOAST action should change open state', () => {
  const action = showToastAction('Message', 300)
  const state = {
    open: false,
    message: '',
    autoHideDuration: 3000
  }
  const expected = {
    open: true,
    message: 'Message',
    autoHideDuration: 300
  }
  const actual = toastSingletonReducer(state, action)
  expect(actual).toEqual(expected)
})

test('CLOSE_TOAST action should change open state', () => {
  const action = closeToastAction()
  const state = {
    open: true,
    message: 'Message',
    autoHideDuration: 300
  }
  const expected = {
    open: false,
    message: 'Message',
    autoHideDuration: 300
  }
  const actual = toastSingletonReducer(state, action)
  expect(actual).toEqual(expected)
})
