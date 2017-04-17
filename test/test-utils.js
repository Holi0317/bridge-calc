import test from 'ava'

/**
 * Mocked translate function for i18next.t
 */
export function t(key, options) {
  if (options == null) {
    return key
  }
  let result = key
  for (const k of Object.keys(options)) {
    const value = options[k]
    const template = `{{${k}}}`
    result = result.replace(template, value)
  }
  return result
}

const trans = t

test('t should return key if there is no options', t => {
  const expected = 'MyKey'
  const actual = trans('MyKey')
  t.is(actual, expected, 'Key should be returned')
})

test('t should return key if options is empty object', t => {
  const expected = 'MyKey'
  const actual = trans('MyKey', {})
  t.is(actual, expected, 'Key should be returned')
})

test('t should interpolate key when there is options passed in', t => {
  const expected = 'This is my key'
  const actual = trans('{{that}} is {{who}} key', {that: 'This', who: 'my'})
  t.is(actual, expected, 'Interpolation should success')
})
