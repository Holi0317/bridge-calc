import {toOrdinal} from './to-ordinal'

test('toOrdinal should work on 1', () => {
  const value = 1
  const expected = '1st'
  const actual = toOrdinal(value)
  expect(actual).toBe(expected)
})

test('toOrdinal should work on 4', () => {
  const value = 4
  const expected = '4th'
  const actual = toOrdinal(value)
  expect(actual).toBe(expected)
})

test('toOrdinal should work on 11', () => {
  const value = 11
  const expected = '11th'
  const actual = toOrdinal(value)
  expect(actual).toBe(expected)
})
