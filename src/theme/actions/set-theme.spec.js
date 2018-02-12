import {ActionTypes} from '../../action-types'
import {setThemeAction, setAutoDarkThemeAction, setDarkThresholdAction} from './set-theme'

test('it should return set theme action', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    theme: 'default'
  }
  const actual = setThemeAction('default')
  expect(actual).toEqual(expected)
})

test('it should return set autoDarkTheme property action', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    autoDarkTheme: true
  }
  const actual = setAutoDarkThemeAction(true)
  expect(actual).toEqual(expected)
})

test('it should return setDarkThreshold action', () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    darkThreshold: 1000
  }
  const actual = setDarkThresholdAction(1000)
  expect(actual).toEqual(expected)
})
