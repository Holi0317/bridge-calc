import {deleteGameAction, DELETE_GAME} from './delete-game'

test('it should return delete game action', () => {
  const expected = {
    type: DELETE_GAME,
    id: 3
  }
  const actual = deleteGameAction(3)
  expect(actual).toEqual(expected)
})
