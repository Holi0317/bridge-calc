import {isPlayerMapOf} from './is-player-map-of'

test('it should pass for empty object', () => {
  const obj = {}
  const of = 'string'
  const expected = true
  const actual = isPlayerMapOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should pass for matching type', () => {
  const obj = {
    hydrogen: 1,
    helium: 2,
    cadmium: 48
  }
  const of = 'number'
  const expected = true
  const actual = isPlayerMapOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should pass for matching array type', () => {
  const obj = {
    hydrogen: [1],
    helium: [2],
    cadmium: [2, 8, 18, 18, 2]
  }
  const of = 'number[]'
  const expected = true
  const actual = isPlayerMapOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should fail for unmatched type', () => {
  const obj = {
    hydrogen: 1,
    helium: 2,
    cadmium: 48
  }
  const of = 'string'
  const expected = false
  const actual = isPlayerMapOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should fail for unmatched array type', () => {
  const obj = {
    hydrogen: [1],
    helium: [2],
    cadmium: [2, 8, 18, 18, 2]
  }
  const of = 'string[]'
  const expected = false
  const actual = isPlayerMapOf(obj, of)
  expect(actual).toEqual(expected)
})
