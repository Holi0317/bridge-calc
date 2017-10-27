import {havePrevGamesSelector} from './have-prev-games'
import {makePrevGamesTree} from '../../../test-fixtures/prev-games-state'

test('it should return false for empty array in state tree', () => {
  const tree = makePrevGamesTree([])
  const expected = false
  const actual = havePrevGamesSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should return true when there is element in state tree', () => {
  const tree = makePrevGamesTree(['a'])
  const expected = true
  const actual = havePrevGamesSelector(tree)
  expect(actual).toEqual(expected)
})
