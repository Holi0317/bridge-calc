import test from 'ava'
import * as utils from '../src/utils'

test('genID generate unique ID', t => {
  const first = utils.genID()
  const second = utils.genID()

  t.not(first, second, 'Two generated ID should not be equal')
})

test('nth should work when given index is below array.length', t => {
  const array = ['a', 'b', 'c']
  const actual = utils.nth(array, 1)
  const expected = 'b'

  t.is(actual, expected, 'Return element should be the second element in the array')
})

test('nth should work when given index is larger than array.length', t => {
  const array = ['a', 'b', 'c']
  const actual = utils.nth(array, 10)
  const expected = 'b'

  t.is(actual, expected, 'Return element should be the second element in the array')
})

test('toFront should do no-op when frontIndex is 0', t => {
  const array = ['a', 'b', 'c']
  const actual = utils.toFront(array, 0)
  const expected = ['a', 'b', 'c']

  t.deepEqual(actual, expected, 'Clone of array should be returned')
})

test('toFront should sort array according to frontIndex', t => {
  const array = ['a', 'b', 'c', 'd', 'e']
  const actual = utils.toFront(array, 2)
  const expected = ['c', 'd', 'e', 'a', 'b']

  t.deepEqual(actual, expected, 'The first element should be the one specified by frontIndex')
})

test('toFront should throw error if frontIndex is out of boundary', t => {
  const array = ['a', 'b', 'c']

  t.throws(() => utils.toFront(array, 3), 'frontIndex is out of boundary', 'Error should be thrown when frontIndex is out of boundary')
})

test('isOK should return true when empty object is passed in', t => {
  const actual = utils.isOk({})
  const expected = true
  t.is(actual, expected, 'Empty object should be consider as no error')
})

test('isOk should fail if non-empty plain object is passed in', t => {
  const actual = utils.isOk({foo: 'Not filled in'})
  const expected = false
  t.is(actual, expected, 'Object with any key should be considered as error')
})

test('isOk should pass if value is undefined', t => {
  const opt = {a: undefined}
  const actual = utils.isOk(opt)
  const expected = true
  t.is(actual, expected, 'undefined should be considered as pass')
})

test('removeUndef should not mutate original object', t => {
  const obj = {a: undefined, b: 'yo'}
  utils.removeUndef(obj)
  const expected = {a: undefined, b: 'yo'}
  t.deepEqual(obj, expected, 'Original object should not be mutated')
})

test('removeUndef should remove undefined properties', t => {
  const obj = {a: undefined, b: 'yo'}
  const actual = utils.removeUndef(obj)
  const expected = {b: 'yo'}
  t.deepEqual(actual, expected, 'undefined properties should be removed')
})

test('removeUndef should remove null properties', t => {
  const obj = {a: null, b: 'yo'}
  const actual = utils.removeUndef(obj)
  const expected = {b: 'yo'}
  t.deepEqual(actual, expected, 'null properties should be removed')
})

test('removeUndef should remove empty string properties', t => {
  const obj = {a: '', b: 'yo'}
  const actual = utils.removeUndef(obj)
  const expected = {b: 'yo'}
  t.deepEqual(actual, expected, 'empty string should be removed')
})

test('fill should not mutate passed in argument', t => {
  const obj = {a: 'yo', b: 'bar'}
  const keys = ['a', 'b', 'c', 'd']
  utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'bar'}
  t.deepEqual(obj, expected, 'Object passed in should not be mutated')
})

test('fill should fill up null property', t => {
  const obj = {a: 'yo', b: 'bar', c: null}
  const keys = ['a', 'b', 'c']
  const actual = utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'bar', c: 'filled'}
  t.deepEqual(actual, expected, 'null property should be filled')
})

test('fill should fill up undefined property', t => {
  const obj = {a: 'yo', c: 'bar'}
  const keys = ['a', 'b', 'c']
  const actual = utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'filled', c: 'bar'}
  t.deepEqual(actual, expected, 'undefined property should be filled')
})

test('fill should not keep unlisted property unmodified', t => {
  const obj = {a: 'yo', b: 'aaa', c: 'bar'}
  const keys = ['a', 'c']
  const actual = utils.fillObj(obj, keys, 'filled')
  const expected = {a: 'yo', b: 'aaa', c: 'bar'}
  t.deepEqual(actual, expected, 'undefined property should be filled')
})

test('createSource should create source according to input', t => {
  const values = [1, 2, 3]
  const expected = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3}
  ]
  const actual = utils.createSource(values)
  t.deepEqual(actual, expected, 'Source should be created')
})

test('toOrdinal should work on 1', t => {
  const value = 1
  const expected = '1st'
  const actual = utils.toOrdinal(value)
  t.is(actual, expected, '1 should be converted')
})

test('toOrdinal should work on 4', t => {
  const value = 4
  const expected = '4th'
  const actual = utils.toOrdinal(value)
  t.is(actual, expected, '4 should be converted')
})

test('toOrdinal should work on 11', t => {
  const value = 11
  const expected = '11th'
  const actual = utils.toOrdinal(value)
  t.is(actual, expected, '11 should be converted')
})

test('dupe should return empty array for empty array input', t => {
  const input = []
  const expected = []
  const actual = utils.dupe(input)
  t.deepEqual(actual, expected, 'Empty array should be the output')
})

test('dupe should return empty array for all unique items', t => {
  const input = [1, 2, 3, 4, 5]
  const expected = []
  const actual = utils.dupe(input)
  t.deepEqual(actual, expected, 'No duplicate element should be found')
})

test('dupe should not mutate the input array', t => {
  const input = [1, 2, 3]
  const expected = [1, 2, 3]
  utils.dupe(input)
  t.deepEqual(input, expected, 'Input array should not be mutated')
})

test('dupe should return only 1 duplicated item for duplicated element', t => {
  const input = [1, 2, 3, 2, 1, 2]
  const expected = [2, 1] // 2 is repeated first
  const actual = utils.dupe(input)
  t.deepEqual(actual, expected, 'Duplicated elements should exist in result')
})
