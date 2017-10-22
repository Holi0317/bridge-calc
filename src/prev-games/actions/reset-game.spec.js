import {resetGamesAtion, RESET_GAMES} from './reset-games'

test('it should return reset games action', () => {
  const expected = {
    type: RESET_GAMES
  }
  const actual = resetGamesAtion()
  expect(actual).toEqual(expected)
})
