import {whitelistKeys} from './whitelist-keys'

test('it should pass for empty keys', () => {
  const keys = []
  const obj = {}
  const expected = true
  const actual = whitelistKeys(obj, keys)
  expect(actual).toEqual(expected)
})

test('it should pass for objects matching keys', () => {
  const keys = ['foo', 'bar']
  const obj = {
    foo: 'aaa',
    bar: 'value'
  }
  const expected = true
  const actual = whitelistKeys(obj, keys)
  expect(actual).toEqual(expected)
})

test('it should pass even some value of the object is undefined', () => {
  const keys = ['Hydrogen', 'Helium', 'Lithium']
  const obj = {
    Hydrogen: 1,
    Helium: 2,
    Lithium: undefined
  }
  const expected = true
  const actual = whitelistKeys(obj, keys)
  expect(actual).toEqual(expected)
})

test('it should fail for excess properties', () => {
  const keys = ['Hydrogen', 'Helium']
  const obj = {
    Hydrogen: 1,
    Helium: 0,
    Lithium: 1
  }
  const expected = false
  const actual = whitelistKeys(obj, keys)
  expect(actual).toEqual(expected)
})

test('it should fail for missing properties', () => {
  const keys = ['Hydrogen', 'Helium', 'Lithium']
  const obj = {
    Hydrogen: 1,
    Helium: 0
  }
  const expected = false
  const actual = whitelistKeys(obj, keys)
  expect(actual).toEqual(expected)
})

test('it should fail for non-object primitives', () => {
  const keys = ['Hydrogen']
  const obj = ''
  const expected = false
  const actual = whitelistKeys(obj, keys)
  expect(actual).toEqual(expected)
})

test('it should throw error for null', () => {
  const keys = ['Hydrogen']
  const obj = null
  expect(() => whitelistKeys(obj, keys)).toThrow()
})
