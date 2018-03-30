import {ActionTypes} from '../../action-types'
import {setThemeAction, setDarkThresholdAction, setIlluminanceAction} from './set-theme'

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

test('it should return set illuminance action for numeric illuminance', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    currentIlluminance: 5216
  }
  const actual = setIlluminanceAction(5216)
  expect(actual).toEqual(expected)
})

test('it should return set illuminance action for null illuminance', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    currentIlluminance: null
  }
  const actual = setIlluminanceAction(null)
  expect(actual).toEqual(expected)
})
