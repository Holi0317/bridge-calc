import {themes} from '../color-presets'
import {activatedThemeSelector} from './activated-theme'

/**
 * Make partial of the redux tree for consumption.
 *
 * @param {Object} rest Properties to override in theme section
 * @returns {Object} Part of redux store tree for consumption
 */
function makeTree(rest) {
  return {
    theme: {
      theme: 'default',
      autoDarkTheme: false,
      darkThreshold: 1000,
      currentIlluminance: null,
      ...rest
    }
  }
}

test('it should return default theme in default situation', () => {
  const expected = themes.get('default')
  const state = makeTree({})
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(expected)
})

test('it should return dark theme if it is selected', () => {
  const expected = themes.get('dark')
  const state = makeTree({
    theme: 'dark'
  })
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(expected)
})

test('it should return dark theme if illuminance is too low', () => {
  const expected = themes.get('dark')
  const state = makeTree({
    autoDarkTheme: true,
    currentIlluminance: 1
  })
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(expected)
})

test('it should return other themes also', () => {
  const expected = themes.get('teal')
  const state = makeTree({
    theme: 'teal'
  })
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(expected)
})

test('it should return selected theme if illuminance is high', () => {
  const expected = themes.get('teal')
  const state = makeTree({
    theme: 'teal',
    autoDarkTheme: true,
    currentIlluminance: 100000
  })
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(expected)
})

test('it should return default theme if selected theme is not available', () => {
  const expected = themes.get('default')
  const state = makeTree({
    theme: 'awesome-theme-but-this-does-not-exist-🎉'
  })
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(expected)
})
