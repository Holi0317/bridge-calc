import {changePlayersHandler} from './change-players-handler'
import {CHANGE_PLAYERS} from '../score-input-actions'
import {genMap, waitingBidState, waitingWinState, endedState} from '../../../test-fixtures/current-game-states'

test('it should no-op when new player map is identical to original one', () => {
  const state = {
    ...waitingBidState
  }
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'DPGJW', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genReorderedMap('Mary', 'Henry', 'Joe', 'John'),
    maker: 'b',
    rounds: 13,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'c',
    rounds: 13,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 12,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genSmallMap('John', 'Mary', 'Henry'),
    maker: 'a',
    rounds: 13,
    time: new Date(1)
  }
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
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genNewMap('John', 'Mary', 'Henry', 'Joe', 'DPGJW'),
    maker: 'b',
    rounds: 13,
    time: new Date(1)
  }
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should end game when given rounds is less than current round', () => {
  const expected = {
    ...endedState,
    rounds: 1,
    scores: genMap([0], [0], [0], [0]),
    names: genMap('Mary', 'John', 'Henry', 'Joe'),
    endTime: new Date(1)
  }
  const s = [0, 0] // Short hand for score
  const state = {
    ...waitingBidState,
    currentRound: 3,
    currentPlayerOrder: ['c', 'd', 'a', 'b'],
    scores: genMap(s, s, s, s)
  }
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('Mary', 'John', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 1,
    time: new Date(1)
  }
  const actual = changePlayersHandler(state, action)
  expect(actual).toEqual(expected)
})
