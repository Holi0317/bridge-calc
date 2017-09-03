import * as utils from '../src/utils'

test('genID generate unique ID', () => {
  const first = utils.genID()
  const second = utils.genID()

  expect(first).not.toBe(second)
})

test('nth should work when given index is below array.length', () => {
  const array = ['a', 'b', 'c']
  const actual = utils.nth(array, 1)
  const expected = 'b'

  expect(actual).toBe(expected)
})

test('nth should work when given index is larger than array.length', () => {
  const array = ['a', 'b', 'c']
  const actual = utils.nth(array, 10)
  const expected = 'b'

  expect(actual).toBe(expected)
})

test('toFront should do no-op when frontIndex is 0', () => {
  const array = ['a', 'b', 'c']
  const actual = utils.toFront(array, 0)
  const expected = ['a', 'b', 'c']

  expect(actual).toEqual(expected)
})

test('toFront should sort array according to frontIndex', () => {
  const array = ['a', 'b', 'c', 'd', 'e']
  const actual = utils.toFront(array, 2)
  const expected = ['c', 'd', 'e', 'a', 'b']

  expect(actual).toEqual(expected)
})

test('toFront should throw error if frontIndex is out of boundary', () => {
  const array = ['a', 'b', 'c']

  expect(() => utils.toFront(array, 3)).toThrowError('frontIndex is out of boundary')
})

test('isOK should return true when empty object is passed in', () => {
  const actual = utils.isOk({})
  const expected = true
  expect(actual).toBe(expected)
})

test('isOk should fail if non-empty plain object is passed in', () => {
  const actual = utils.isOk({foo: 'Not filled in'})
  const expected = false
  expect(actual).toBe(expected)
})

test('isOk should pass if value is undefined', () => {
  const opt = {a: undefined}
  const actual = utils.isOk(opt)
  const expected = true
  expect(actual).toBe(expected)
})

test('removeUndef should not mutate original object', () => {
  const obj = {a: undefined, b: 'yo'}
  utils.removeUndef(obj)
  const expected = {a: undefined, b: 'yo'}
  expect(obj).toEqual(expected)
})

test('removeUndef should remove undefined properties', () => {
  const obj = {a: undefined, b: 'yo'}
  const actual = utils.removeUndef(obj)
  const expected = {b: 'yo'}
  expect(actual).toEqual(expected)
})

test('removeUndef should remove null properties', () => {
  const obj = {a: null, b: 'yo'}
  const actual = utils.removeUndef(obj)
  const expected = {b: 'yo'}
  expect(actual).toEqual(expected)
})

test('removeUndef should remove empty string properties', () => {
  const obj = {a: '', b: 'yo'}
  const actual = utils.removeUndef(obj)
  const expected = {b: 'yo'}
  expect(actual).toEqual(expected)
})

test('fill should not mutate passed in argument', () => {
  const obj = {a: 'yo', b: 'bar'}
  const keys = ['a', 'b', 'c', 'd']
  utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'bar'}
  expect(obj).toEqual(expected)
})

test('fill should fill up null property', () => {
  const obj = {a: 'yo', b: 'bar', c: null}
  const keys = ['a', 'b', 'c']
  const actual = utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'bar', c: 'filled'}
  expect(actual).toEqual(expected)
})

test('fill should fill up undefined property', () => {
  const obj = {a: 'yo', c: 'bar'}
  const keys = ['a', 'b', 'c']
  const actual = utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'filled', c: 'bar'}
  expect(actual).toEqual(expected)
})

test('fill should not keep unlisted property unmodified', () => {
  const obj = {a: 'yo', b: 'aaa', c: 'bar'}
  const keys = ['a', 'c']
  const actual = utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'aaa', c: 'bar'}
  expect(actual).toEqual(expected)
})

test('createSource should create source according to input', () => {
  const values = [1, 2, 3]
  const expected = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3}
  ]
  const actual = utils.createSource(values)
  expect(actual).toEqual(expected)
})

test('toOrdinal should work on 1', () => {
  const value = 1
  const expected = '1st'
  const actual = utils.toOrdinal(value)
  expect(actual).toBe(expected)
})

test('toOrdinal should work on 4', () => {
  const value = 4
  const expected = '4th'
  const actual = utils.toOrdinal(value)
  expect(actual).toBe(expected)
})

test('toOrdinal should work on 11', () => {
  const value = 11
  const expected = '11th'
  const actual = utils.toOrdinal(value)
  expect(actual).toBe(expected)
})

test('dupe should return empty array for empty array input', () => {
  const input = []
  const expected = []
  const actual = utils.dupe(input)
  expect(actual).toEqual(expected)
})

test('dupe should return empty array for all unique items', () => {
  const input = [1, 2, 3, 4, 5]
  const expected = []
  const actual = utils.dupe(input)
  expect(actual).toEqual(expected)
})

test('dupe should not mutate the input array', () => {
  const input = [1, 2, 3]
  const expected = [1, 2, 3]
  utils.dupe(input)
  expect(input).toEqual(expected)
})

test('dupe should return only 1 duplicated item for duplicated element', () => {
  const input = [1, 2, 3, 2, 1, 2]
  const expected = [2, 1] // 2 is repeated first
  const actual = utils.dupe(input)
  expect(actual).toEqual(expected)
})
