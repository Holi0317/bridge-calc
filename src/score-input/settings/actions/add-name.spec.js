import {ActionTypes} from '../../../action-types'
import {addNameAction} from './add-name'

jest.mock('cuid', () => {
  let count = 0
  return jest.fn(() => count++)
})

test('it should return add name action', () => {
  const expected = {
    type: ActionTypes.ADD_NAME,
    name: 'John',
    ID: 0
  }
  const actual = addNameAction('John')
  expect(actual).toEqual(expected)
})
