import {isArrayOf} from './is-array-of'

test('it should pass if all type of array is same', () => {
  const obj = ['a', 'b', 'c']
  const of = 'string'
  const expected = true
  const actual = isArrayOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should pass for empty array', () => {
  const obj = []
  const of = 'string'
  const expected = true
  const actual = isArrayOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should fail if the array type is not match', () => {
  const obj = ['a', 42, 'c']
  const of = 'string'
  const expected = false
  const actual = isArrayOf(obj, of)
  expect(actual).toEqual(expected)
})

test('it should fail if given object is not array', () => {
  const obj = {} 
  const of = 'string'
  const expected = false
  const actual = isArrayOf(obj, of)
  expect(actual).toEqual(expected)
})
