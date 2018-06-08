import {ActionTypes} from '../../../action-types'
import {addNameAction, addRandomNameAction} from './add-name'

test('it should return add name action', () => {
  const expected = {
    type: ActionTypes.ADD_NAME,
    name: 'John',
    ID: '0'
  }
  const actual = addNameAction('John')
  expect(actual).toEqual(expected)
})

test('add random name should return add name action', () => {
  const actual = addRandomNameAction()
  expect(actual.type).toEqual(ActionTypes.ADD_NAME)
  expect(actual.ID).toEqual('1')
  expect(typeof actual.name).toEqual('string')
})
