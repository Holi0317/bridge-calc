import test from 'ava'
import * as utils from '../src/utils'

/**
 * Simple object that will set its 'prop' property to given value from constructor
 * Used for testing fill function
 */
class SimpleObject {
  constructor(val) {
    this.prop = val
  }
}

test('genID generate unique ID', t => {
  const first = utils.genID()
  const second = utils.genID()

  t.not(first, second, 'Two generated ID should not be equal')
})

test('range(1,5) should generates [1,2,3,4,5]', t => {
  const actual = utils.range(1, 5)
  const expected = [1, 2, 3, 4, 5]

  t.deepEqual(actual, expected, 'Generated array should equal to [1,2,3,4,5]')
})

test('range(5,10) should generates [5,6,7,8,9,10]', t => {
  const actual = utils.range(5, 10)
  const expected = [5, 6, 7, 8, 9, 10]

  t.deepEqual(actual, expected, 'Generated array should equal to [5,6,7,8,9,10]')
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

test('fill should do nothing if all elements in the array is defined', t => {
  const actual = ['a', 'b', 'c'].map(el => new SimpleObject(el))
  utils.fill(actual, 'prop', 'filled')
  const expected = ['a', 'b', 'c'].map(el => new SimpleObject(el))

  t.deepEqual(actual, expected, 'No mutation should be done on objects in the array')
})

test('fill should fill up specified properties with value when it is null', t => {
  const actual = ['a', 'b', null].map(el => new SimpleObject(el))
  utils.fill(actual, 'prop', 'filled')
  const expected = ['a', 'b', 'filled'].map(el => new SimpleObject(el))

  t.deepEqual(actual, expected, 'Property should be filled with filled')
})

test('fill should fill up specified properties with value when it is undefined', t => {
  const actual = ['a', 'b', undefined].map(el => new SimpleObject(el))
  utils.fill(actual, 'prop', 'filled')
  const expected = ['a', 'b', 'filled'].map(el => new SimpleObject(el))

  t.deepEqual(actual, expected, 'Property should be filled with filled')
})

test('fill should fill up specified properties with value when it is empty string', t => {
  const actual = ['a', 'b', ''].map(el => new SimpleObject(el))
  utils.fill(actual, 'prop', 'filled')
  const expected = ['a', 'b', 'filled'].map(el => new SimpleObject(el))

  t.deepEqual(actual, expected, 'Property should be filled with filled')
})

test('last should return the last element of an array', t => {
  const data = [10, 11, 12]
  const actual = utils.last(data)
  const expected = 12

  t.is(actual, expected, 'The last element is expected to return')
})

test('last should return null for empty array', t => {
  const data = []
  const actual = utils.last(data)
  const expected = null

  t.is(actual, expected, 'Null should be returned')
})
