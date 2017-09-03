import {START, SKIP, SET_BID, BID, SET_WIN, WIN, UNDO, CHANGE_PLAYERS} from '../../src/actions/current-game'
import {startParams, waitingBidState, waitingWinState, endedState, genMap} from '../fixtures/current-game-states'
import {currentGame as reducer} from '../../src/reducer/current-game/index'

test('Default state should be null', () => {
  const expected = null
  const actual = reducer(undefined, {type: ''})
  expect(expected).toBe(actual)
})

test('Production of default basic state after start', () => {
  const expected = {
    ...waitingBidState
  }
  const action = {
    type: START,
    ...startParams
  }
  const actual = reducer(null, action)
  expect(actual).toEqual(expected)
})

test('Start on second round should work', () => {
  const expected = {
    ...waitingBidState,
    scores: genMap([0], [0], [0], [0]),
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2
  }
  const action = {
    type: START,
    ...startParams,
    startingRound: 2
  }
  const actual = reducer(null, action)
  expect(actual).toEqual(expected)
})

test('Skip should do no-op when the state is null', () => {
  const expected = null
  const action = {
    type: SKIP,
    time: new Date(1)
  }
  const actual = reducer(null, action)
  expect(actual).toBe(expected)
})

test('Skip should skip 1 round if no payload is supplied', () => {
  const expected = {
    ...waitingBidState,
    scores: genMap([0], [0], [0], [0]),
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2
  }
  const state = {
    ...waitingBidState
  }
  const action = {
    type: SKIP,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Skip should reset bid and win data', () => {
  const expected = {
    ...waitingBidState,
    scores: genMap([0], [0], [0], [0]),
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2
  }
  const state = {
    ...waitingWinState,
    bid: genMap(0, 1, 0, 1),
    win: genMap(0, 1, 0, 0)
  }
  const action = {
    type: SKIP,
    times: 1,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Skip on last round should change state to ended', () => {
  const expected = {
    ...endedState,
    rounds: 2,
    scores: genMap([0], [0], [0], [0])
  }
  const state = {
    ...waitingBidState,
    rounds: 2
  }
  const action = {
    type: SKIP,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Skip on ended state should do no-op', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: SKIP,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Set bid should do no-op when state is null', () => {
  const expected = null
  const action = {
    type: SET_BID,
    payload: genMap(0, 0, 0, 0)
  }
  const actual = reducer(null, action)
  expect(actual).toBe(expected)
})

test('Set bid should do no-op when stage is ended', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: SET_BID,
    payload: genMap(0, 0, 0, 0)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Set bid should set bid property', () => {
  const expected = {
    ...waitingBidState,
    bid: genMap(0, 1, 0, 0)
  }
  const state = {
    ...waitingBidState,
    bid: genMap(0, 0, 0, 0)
  }
  const action = {
    type: SET_BID,
    payload: genMap(0, 1, 0, 0)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Set win should do no-op when state is null', () => {
  const expected = null
  const action = {
    type: SET_WIN,
    payload: genMap(0, 0, 0, 0)
  }
  const actual = reducer(null, action)
  expect(actual).toBe(expected)
})

test('Set win should do no-op when stage is ended', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: SET_WIN,
    payload: genMap(0, 0, 0, 0)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Set win should set win property', () => {
  const expected = {
    ...waitingWinState,
    win: genMap(0, 1, 0, 0)
  }
  const state = {
    ...waitingWinState,
    win: genMap(0, 0, 0, 0)
  }
  const action = {
    type: SET_WIN,
    payload: genMap(0, 1, 0, 0)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Bid should do no-op when the state is null', () => {
  const expected = null
  const action = {
    type: BID,
    payload: genMap(0, 1, 0, 1)
  }
  const actual = reducer(null, action)
  expect(actual).toBe(expected)
})

test('Bid should do no-op when game stage is ended', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: BID,
    payload: genMap(0, 1, 0, 1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Bid should change stage to waitingWin', () => {
  const expected = {
    ...waitingWinState,
    bid: genMap(0, 1, 0, 1)
  }
  const state = {
    ...waitingBidState,
    bid: genMap(0, 0, 0, 0)
  }
  const action = {
    type: BID,
    payload: genMap(0, 1, 0, 1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Bid should use data from currentGame.bid when bid is not given in payload', () => {
  const expected = {
    ...waitingWinState,
    bid: genMap(0, 1, 0, 1)
  }
  const state = {
    ...waitingBidState,
    bid: genMap(0, 1, 0, 1)
  }
  const action = {
    type: BID
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Win should do no-op when state is null', () => {
  const expected = null
  const state = null
  const action = {
    type: WIN,
    win: genMap(0, 1, 0, 0),
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Win should do no-op when game stage is ended', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: WIN,
    win: genMap(0, 1, 0, 0),
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Win should change stage to waitingBid', () => {
  const expected = {
    ...waitingBidState,
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2,
    scores: genMap([11], [10], [10], [-1])
  }
  const state = {
    ...waitingWinState,
    bid: genMap(1, 0, 0, 1)
  }
  const action = {
    type: WIN,
    win: genMap(1, 0, 0, 0),
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Win should change stage to ended for last round', () => {
  const expected = {
    ...endedState,
    rounds: 1,
    scores: genMap([11], [10], [10], [-1])
  }
  const state = {
    ...waitingWinState,
    rounds: 1,
    bid: genMap(1, 0, 0, 1)
  }
  const action = {
    type: WIN,
    win: genMap(1, 0, 0, 0),
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Win should use data from gameStage.win if win is not given in action', () => {
  const expected = {
    ...waitingBidState,
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2,
    scores: genMap([11], [10], [10], [-1])
  }
  const state = {
    ...waitingWinState,
    bid: genMap(1, 0, 0, 1),
    win: genMap(1, 0, 0, 0)
  }
  const action = {
    type: WIN,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Undo should do no-op when state is null', () => {
  const expected = null
  const state = null
  const action = {
    type: UNDO
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Undo should do no-op when stage is ended', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: UNDO
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Undo should do no-op when stage is waitingBid', () => {
  const expected = {
    ...waitingBidState
  }
  const state = {
    ...waitingBidState
  }
  const action = {
    type: UNDO
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Undo should roll back stage is waitingWin', () => {
  const expected = {
    ...waitingBidState,
    bid: genMap(0, 0, 0, 0)
  }
  const state = {
    ...waitingWinState,
    bid: genMap(0, 0, 0, 0)
  }
  const action = {
    type: UNDO
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should do no-op in null state', () => {
  const expected = null
  const state = null
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toBe(expected)
})

test('Change players should do no-op in ended state', () => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should do no-op when given names are same as original map and maker is the current one', () => {
  const expected = {
    ...waitingBidState
  }
  const state = {
    ...waitingBidState
  }
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should revert stage to waitingBid for waitingWin stage', () => {
  const expected = {
    ...waitingBidState
  }
  const state = {
    ...waitingWinState
  }
  const action = {
    type: CHANGE_PLAYERS,
    newNames: genMap('John', 'Mary', 'Henry', 'Joe'),
    maker: 'a',
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test("Change players should change player's names from given map", () => {
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
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should change all maps order from given map (For no addition nor deletion)', () => {
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
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should re-order players by given maker', () => {
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
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should change rounds from given payload', () => {
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
    rounds: 12
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should remove all data from removed player', () => {
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
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should assign 0 mark for ended rounds of new player', () => {
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
    rounds: 13
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should end game when given rounds is less than current round', () => {
  const expected = {
    ...endedState,
    rounds: 1,
    scores: genMap([0], [0], [0], [0]),
    names: genMap('Mary', 'John', 'Henry', 'Joe'),
    endTime: new Date(60000) // 1 minute in ms
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
    rounds: 1
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
