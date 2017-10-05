import {reset, RESET} from './reset'

test('it should return reset action', () => {
  const expected = {
    type: RESET
  }
  const actual = reset()
  expect(actual).toEqual(expected)
})
