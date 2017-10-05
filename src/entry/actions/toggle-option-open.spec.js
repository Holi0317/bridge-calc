import {toggleOptionOpen, TOGGLE_OPTION_OPEN} from './toggle-option-open'

test('it should return toggle option open action', () => {
  const expected = {
    type: TOGGLE_OPTION_OPEN
  }
  const actual = toggleOptionOpen()
  expect(actual).toEqual(expected)
})
