import {deleteGameAction, DELETE_GAME, lazyDeleteGameAction} from './delete-game'

test('it should return delete game action', () => {
  const expected = {
    type: DELETE_GAME,
    id: 3
  }
  const actual = deleteGameAction(3)
  expect(actual).toEqual(expected)
})

test('lazy action should return function for delete game action', () => {
  const expected = {
    type: DELETE_GAME,
    id: 3
  }
  const wrapper = lazyDeleteGameAction(3)
  const actual = wrapper()
  expect(actual).toEqual(expected)
})
