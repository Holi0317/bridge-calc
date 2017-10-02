import {dupe} from './dupe'

test('dupe should return empty array for empty array input', () => {
  const input = []
  const expected = []
  const actual = dupe(input)
  expect(actual).toEqual(expected)
})

test('dupe should return empty array for all unique items', () => {
  const input = [1, 2, 3, 4, 5]
  const expected = []
  const actual = dupe(input)
  expect(actual).toEqual(expected)
})

test('dupe should not mutate the input array', () => {
  const input = [1, 2, 3]
  const expected = [1, 2, 3]
  dupe(input)
  expect(input).toEqual(expected)
})

test('dupe should return only 1 duplicated item for duplicated element', () => {
  const input = [1, 2, 3, 2, 1, 2]
  const expected = [2, 1] // 2 is repeated first
  const actual = dupe(input)
  expect(actual).toEqual(expected)
})
