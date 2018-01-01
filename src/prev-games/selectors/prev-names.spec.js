import {makePrevGamesTree} from '../../../test-fixtures/prev-games-state'
import {prevNamesSelector} from './prev-names'
import {gameStateToPrevGame} from '../converter'
import {endedState, genMap, waitingBidState} from '../../../test-fixtures/current-game-states'

test('it should produce empty array for no entries', () => {
  const expected = []
  const tree = makePrevGamesTree([])
  const actual = prevNamesSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should produce names for 1 entry', () => {
  const expected = [['John', 'Mary', 'Henry', 'Joe']]
  const entry = gameStateToPrevGame(waitingBidState)
  const tree = makePrevGamesTree([entry])
  const actual = prevNamesSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should produce names for 2 entries', () => {
  const expected = [
    ['John', 'Mary', 'Henry', 'Joe'],
    ['Helen', 'Alex', ';)', 'BOBBY']
  ]
  const entry1 = gameStateToPrevGame(waitingBidState)
  const entry2 = gameStateToPrevGame({
    ...endedState,
    names: genMap('Helen', 'Alex', ';)', 'BOBBY')
  })
  const tree = makePrevGamesTree([entry1, entry2])
  const actual = prevNamesSelector(tree)
  expect(actual).toEqual(expected)
})
