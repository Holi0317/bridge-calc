import {nameEditDisabledSelector} from './name-edit-disabled'

test('it should select makerDirty state', () => {
  const expected = true
  const state = {
    gameSettings: {
      isDirty: true
    }
  }
  const actual = nameEditDisabledSelector(state)
  expect(actual).toEqual(expected)
})
