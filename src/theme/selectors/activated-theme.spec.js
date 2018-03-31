import {activatedThemeSelector} from './activated-theme'
import {defaultTheme} from '../color-presets'

/**
 * Make partial of redux tree for consumption.
 *
 * @param {String} theme - Name / ID of the theme selected
 * @returns {Object} partial redux tree
 */
function makeTree(theme) {
  return {
    theme: {
      theme
    }
  }
}

test('it should work on existing theme', () => {
  const state = makeTree('dark')
  const actual = activatedThemeSelector(state)
  expect(actual).toMatchSnapshot()
})

test('it should return default on non-existing theme', () => {
  const state = makeTree(Math.random().toString(36).substring(7))
  const actual = activatedThemeSelector(state)
  expect(actual).toEqual(defaultTheme)
})
