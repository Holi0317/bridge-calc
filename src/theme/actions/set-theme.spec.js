import {ActionTypes} from '../../action-types'
import {setThemeAction, setDarkThresholdAction, setIllumanceAction} from './set-theme'

test('it should return set theme action', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    theme: 'default'
  }
  const actual = setThemeAction('default')
  expect(actual).toEqual(expected)
})

test('it should return set dark thereshold action', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    darkThreshold: 1000
  }
  const actual = setDarkThresholdAction(1000)
  expect(actual).toEqual(expected)
})

test('it should return set illumance action for numeric illumance', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    currentIllumance: 5216
  }
  const actual = setIllumanceAction(5216)
  expect(actual).toEqual(expected)
})

test('it should return set illumance action for null illumance', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    currentIllumance: null
  }
  const actual = setIllumanceAction(null)
  expect(actual).toEqual(expected)
})
