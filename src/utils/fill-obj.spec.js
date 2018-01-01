import {fillObj} from './fill-obj'

test('fill should not mutate passed in argument', () => {
  const obj = {a: 'yo', b: 'bar'}
  const keys = ['a', 'b', 'c', 'd']
  fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'bar'}
  expect(obj).toEqual(expected)
})

test('fill should fill up null property', () => {
  const obj = {a: 'yo', b: 'bar', c: null}
  const keys = ['a', 'b', 'c']
  const actual = fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'bar', c: 'filled'}
  expect(actual).toEqual(expected)
})

test('fill should fill up undefined property', () => {
  const obj = {a: 'yo', c: 'bar'}
  const keys = ['a', 'b', 'c']
  const actual = fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'filled', c: 'bar'}
  expect(actual).toEqual(expected)
})

test('fill should not keep unlisted property unmodified', () => {
  const obj = {a: 'yo', b: 'aaa', c: 'bar'}
  const keys = ['a', 'c']
  const actual = fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'aaa', c: 'bar'}
  expect(actual).toEqual(expected)
})
