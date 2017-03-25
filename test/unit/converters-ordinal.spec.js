import test from 'tape'
import {OrdinalFormatValueConverter} from '../../src/converters/ordinal-format'

const converter = new OrdinalFormatValueConverter()

test('convert 1 to 1st', t => {
  const actual = converter.toView('1')
  const expected = '1st'
  t.equal(actual, expected, '1 should be converted to 1st')
  t.end()
})

test('convert 2 to 2nd', t => {
  const actual = converter.toView('2')
  const expected = '2nd'
  t.equal(actual, expected, '2 should be converted to 2nd')
  t.end()
})

test('convert 3 to 3rd', t => {
  const actual = converter.toView('3')
  const expected = '3rd'
  t.equal(actual, expected, '3 should be converted to 3rd')
  t.end()
})

test('convert 4 to 4th', t => {
  const actual = converter.toView('4')
  const expected = '4th'
  t.equal(actual, expected, '3 should be converted to 4th')
  t.end()
})

test('convert 11 to 11th', t => {
  const actual = converter.toView('11')
  const expected = '11th'
  t.equal(actual, expected, '11 should be converted to 11th')
  t.end()
})

test('Return the input when input is not a number', t => {
  const actual = converter.toView('whatever')
  const expected = 'whatever'
  t.equal(actual, expected, 'whatever should be returned since it is not a number')
  t.end()
})

test('Return the input when input is a float', t => {
  const actual = converter.toView('0.5')
  const expected = '0.5'
  t.equal(actual, expected, '0.5 should be returned since it is a float')
  t.end()
})
