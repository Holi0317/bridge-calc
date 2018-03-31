import {illuminanceSelector} from './illuminance'

test('it should select correct attribute', () => {
  const state = {
    theme: {
      currentIlluminance: 10
    }
  }
  const expected = 10
  const actual = illuminanceSelector(state)
  expect(actual).toEqual(expected)
})
