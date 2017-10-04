import {trans} from './translate'

test('Empty options should return key directly', () => {
  const key = 'To be translated'
  const expected = 'To be translated'
  const actual = trans(key)
  expect(actual).toMatch(expected)
})

test('Empty object options should return key directly', () => {
  const key = 'To be translated'
  const options = {}
  const expected = 'To be translated'
  const actual = trans(key, options)
  expect(actual).toMatch(expected)
})

test('Template in key should be replaced', () => {
  const key = '{{time}} be trans{{suffix}}'
  const options = {
    time: 'To',
    suffix: 'lated'
  }
  const expected = 'To be translated'
  const actual = trans(key, options)
  expect(actual).toMatch(expected)
})
