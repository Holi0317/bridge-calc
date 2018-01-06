import {stripHostname, stripTrailingSlash} from './basename-process'

test('stripTrailingSlash should strip trailing slash for correct input', () => {
  const input = '/testing/'
  const expected = '/testing'
  const actual = stripTrailingSlash(input)
  expect(actual).toEqual(expected)
})

test('stripTrailingSlash should still work if there is hostname in input', () => {
  const input = 'https://example.com/testing/'
  const expected = 'https://example.com/testing'
  const actual = stripTrailingSlash(input)
  expect(actual).toEqual(expected)
})

test('stripTrailingSlash should strip nothing if there is no trailing slash', () => {
  const input = '/testing'
  const expected = '/testing'
  const actual = stripTrailingSlash(input)
  expect(actual).toEqual(expected)
})

test('stripTrailingSlash should keep trailing slash for "/"', () => {
  const input = '/'
  const expected = '/'
  const actual = stripTrailingSlash(input)
  expect(actual).toEqual(expected)
})

test('stripTrailingSlash should only strip one slash for multiple trailing slash', () => {
  const input = '/testing//'
  const expected = '/testing/'
  const actual = stripTrailingSlash(input)
  expect(actual).toEqual(expected)
})

test('stripHostname should remove hostname', () => {
  const input = 'https://example.com/testing/'
  const expected = '/testing/'
  const actual = stripHostname(input)
  expect(actual).toEqual(expected)
})

test('stripHostname should give root path if given path is pointing to root of domain', () => {
  const input = 'https://example.com'
  const expected = '/'
  const actual = stripHostname(input)
  expect(actual).toEqual(expected)
})
