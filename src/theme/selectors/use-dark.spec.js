import {useDarkSelector} from './use-dark'

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

test('it should activate if requirements are met', () => {
  const expected = true
  const state = makeTree({
    currentIlluminance: 10,
    darkThreshold: 50,
    autoDarkTheme: true
  })
  const actual = useDarkSelector(state)
  expect(actual).toEqual(expected)
})

test('it should not activate if no illuminance is detected', () => {
  const expected = false
  const state = makeTree({
    currentIlluminance: null,
    autoDarkTheme: true
  })
  const actual = useDarkSelector(state)
  expect(actual).toEqual(expected)
})

test('it should not activate if illuminance is too high', () => {
  const expected = false
  const state = makeTree({
    currentIlluminance: 1000,
    darkThreshold: 50,
    autoDarkTheme: true
  })
  const actual = useDarkSelector(state)
  expect(actual).toEqual(expected)
})

test('it should not activate if not enabled', () => {
  const expected = false
  const state = makeTree({
    currentIlluminance: 10,
    darkThreshold: 50,
    autoDarkTheme: false
  })
  const actual = useDarkSelector(state)
  expect(actual).toEqual(expected)
})
