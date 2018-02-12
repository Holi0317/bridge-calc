import {themeReducer as reducer} from './theme-reducer'
import {setThemeAction, setAutoDarkThemeAction, setDarkThresholdAction} from './actions/set-theme'

const defaultState = {
  theme: 'default',
  autoDarkTheme: false,
  darkThreshold: 1000
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

test('setAutoDarkThemeAction should work', () => {
  const state = defaultState
  const action = setAutoDarkThemeAction(true)
  const expected = {
    ...defaultState,
    autoDarkTheme: true
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('setDarkThresholdAction should work', () => {
  const state = defaultState
  const action = setDarkThresholdAction(2000)
  const expected = {
    ...defaultState,
    darkThreshold: 2000
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
