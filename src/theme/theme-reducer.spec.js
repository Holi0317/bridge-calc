import {themeReducer as reducer} from './theme-reducer'
import {setThemeAction, setDarkThresholdAction, setIllumanceAction} from './actions/set-theme'
import {setAutoDarkAction} from './actions/set-auto-dark'

const defaultState = {
  theme: 'default',
  autoDarkTheme: false,
  darkThreshold: 1000,
  currentIllumance: null
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

test('setAutoDarkAction should work', () => {
  const state = defaultState
  const action = setAutoDarkAction(true)
  const expected = {
    ...defaultState,
    autoDarkTheme: true
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('setAutoDarkAction should clear current illumance when disabled', () => {
  const state = {
    ...defaultState,
    autoDarkTheme: true,
    currentIllumance: 2048
  }
  const action = setAutoDarkAction(false)
  const expected = {
    ...defaultState,
    autoDarkTheme: false,
    currentIllumance: null
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

test('setIllumanceAction should work', () => {
  const state = defaultState
  const action = setIllumanceAction(1000)
  const expected = {
    ...defaultState,
    currentIllumance: 1000
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
