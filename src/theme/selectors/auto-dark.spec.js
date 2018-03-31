import {autoDarkSelector} from './auto-dark'

test('it should select correct attribute', () => {
  const state = {
    theme: {
      autoDarkTheme: false
    }
  }
  const expected = false
  const actual = autoDarkSelector(state)
  expect(actual).toEqual(expected)
})
