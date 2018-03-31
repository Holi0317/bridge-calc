import {darkThresholdSelector} from './dark-threshold'

test('it should select the correct attribute', () => {
  const state = {
    theme: {
      darkThreshold: 100
    }
  }
  const expected = 100
  const actual = darkThresholdSelector(state)
  expect(actual).toEqual(expected)
})
