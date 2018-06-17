import {isDarkThemeSelector} from './is-dark-theme'

/**
 * Make partial of redux tree for consumption.
 *
 * @param {boolean} dark Is current theme in dark variant or not
 * @returns {Object} partial redux tree
 */
function makeTree(dark = false) {
  return {
    theme: {
      dark
    }
  }
}

test('it should select correct state', () => {
  const expected = true
  const state = makeTree(true)
  const actual = isDarkThemeSelector(state)
  expect(actual).toEqual(expected)
})

