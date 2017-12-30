import {deleteGameAction, DELETE_GAME, lazyDeleteGameAction} from './delete-game'

test('it should return delete game action', () => {
  const expected = {
    type: DELETE_GAME,
    index: 3
  }
  const actual = deleteGameAction(3)
  expect(actual).toEqual(expected)
})
