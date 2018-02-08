import {changePlayersHandler} from './change-players-handler'
import {changePlayersAction} from '../actions/change-players'
import {genMap, waitingBidState, waitingWinState} from '../../../test-fixtures/current-game-states'
import * as lolex from 'lolex'
import {GameStage} from '../game-stage'

test('it should no-op when new player map is identical to original one', () => {
  const state = {
    ...waitingBidState
  }
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
  const expected = {
    ...waitingBidState
  }
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should revert waiting win state to waiting bid state', () => {
  const state = {
    ...waitingWinState
  }
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
  const expected = {
    ...waitingBidState
  }
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test("it should change player's names from given map", () => {
  const expected = {
    ...waitingBidState,
    names: genMap('John', 'DPGJW', 'Henry', 'Joe')
  }
  const state = {
    ...waitingBidState
  }
  const newNames = genMap('John', 'DPGJW', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should change all maps order from given map (For no addition nor deletion)', () => {
  function genReorderedMap(b, c, d, a) {
    return {b, c, d, a}
  }

  const expected = {
    ...waitingBidState,
    names: genReorderedMap('Mary', 'Henry', 'Joe', 'John'),
    scores: genReorderedMap([], [], [], []),
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    bid: genReorderedMap(1, 0, 1, 0)
  }
  const state = {
    ...waitingBidState,
    bid: genMap(0, 1, 0, 1)
  }
  const newNames = genReorderedMap('Mary', 'Henry', 'Joe', 'John')
  const action = changePlayersAction(newNames, 'b', 13)
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should re-order players by given maker', () => {
  const expected = {
    ...waitingBidState,
    currentPlayerOrder: ['c', 'd', 'a', 'b']
  }
  const state = {
    ...waitingBidState
  }

  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'c', 13)
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should change rounds from given payload', () => {
  const expected = {
    ...waitingBidState,
    rounds: 12
  }
  const state = {
    ...waitingBidState
  }
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 12)
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should remove all data from removed player', () => {
  function genSmallMap(a, b, c) {
    return {a, b, c}
  }

  const expected = {
    ...waitingBidState,
    names: genSmallMap('John', 'Mary', 'Henry'),
    scores: genSmallMap([], [], []),
    currentPlayerOrder: ['a', 'b', 'c'],
    bid: genSmallMap(0, 1, 0)
  }
  const state = {
    ...waitingBidState,
    bid: genMap(0, 1, 0, 1)
  }
  const newNames = genSmallMap('John', 'Mary', 'Henry')
  const action = changePlayersAction(newNames, 'a', 13)
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should assign 0 mark for ended rounds of new player', () => {
  function genNewMap(a, b, c, d, e) {
    return {b, c, d, a, e}
  }

  const expected = {
    ...waitingBidState,
    currentRound: 2,
    names: genNewMap('John', 'Mary', 'Henry', 'Joe', 'DPGJW'),
    currentPlayerOrder: ['b', 'c', 'd', 'a', 'e'],
    scores: genNewMap([10], [11], [10], [-1], [0]),
    bid: genNewMap(0, 0, 0, 0, 0)
  }
  const state = {
    ...waitingBidState,
    currentRound: 2,
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    scores: genMap([10], [11], [10], [-1])
  }
  const newNames = genNewMap('John', 'Mary', 'Henry', 'Joe', 'DPGJW')
  const action = changePlayersAction(newNames, 'b', 13)
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should end game when given rounds is less than current round', () => {
  const clock = lolex.install()

  // Short hand for score
  const s = [0, 0]
  const state = {
    ...waitingBidState,
    currentRound: 3,
    currentPlayerOrder: ['c', 'd', 'a', 'b'],
    scores: genMap(s, s, s, s)
  }
  const newNames = genMap('Mary', 'John', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 1)
  const actual = changePlayersHandler(state, action)

  expect(actual.stage).toEqual(GameStage.ended)
  expect(actual).toMatchSnapshot()

  clock.uninstall()
})
