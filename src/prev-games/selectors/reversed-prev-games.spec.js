import {makePrevGamesTree} from '../../../test-fixtures/prev-games-state'
import {reversedPrevGamesSelector} from './reversed-prev-games'

test('it should return reversed prevGames', () => {
  const prevGames = ['a', 'b', 'c']
  const prevGamesDupe = prevGames.slice()
  const tree = makePrevGamesTree(prevGames)
  const expected = ['c', 'b', 'a']
  const actual = reversedPrevGamesSelector(tree)

  expect(actual).toEqual(expected)
  expect(prevGames).toEqual(prevGamesDupe) // Ensure no mutation
})
