import {themeReducer as reducer} from './theme-reducer'
import {setThemeAction} from './actions/set-theme'

const defaultState = {
  theme: 'default'
}

test('default state', () => {
  const state = undefined
  const action = {
    type: '#NULL'
  }
  const expected = defaultState
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('setThemeAction should work', () => {
  const state = defaultState
  const action = setThemeAction('dark')
  const expected = {
    ...defaultState,
    theme: 'dark'
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
