import {toggleOptionOpenAction, TOGGLE_OPTION_OPEN} from './toggle-option-open'

test('it should return toggle option open action', () => {
  const expected = {
    type: TOGGLE_OPTION_OPEN
  }
  const actual = toggleOptionOpenAction()
  expect(actual).toEqual(expected)
})
