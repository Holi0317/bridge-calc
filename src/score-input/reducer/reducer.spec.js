import {replaceCurrentGameAction} from '../actions/replace-current-game'
import {waitingBidState, waitingWinState, endedState, genMap} from '../../../test-fixtures/current-game-states'
import {currentGameReducer as reducer} from './reducer'
import * as lolex from 'lolex'
import {startAction} from '../actions/start'
import {skipAction} from '../actions/skip'
import {setBidAction} from '../actions/set-bid'
import {setWinAction} from '../actions/set-win'
import {bidAction} from '../actions/bid'
import {winAction} from '../actions/win'
import {undoAction} from '../actions/undo'
import {changePlayersAction} from '../actions/change-players'

jest.mock('cuid', () => {
  let count = 0
  return jest.fn(() => '' + count++)
})

let clock = null
beforeEach(() => {
  clock = lolex.install()
})
afterEach(() => {
  if (clock) {
    clock.uninstall()
  }
})

test('Default state should be null', () => {
  const expected = null
  const actual = reducer(undefined, {type: '#NULL'})
  expect(expected).toBe(actual)
})

test('Production of default basic state after start', () => {
  const action = startAction(13, ['John', 'Mary', 'Henry', 'Joe'], 1)
  const actual = reducer(null, action)
  expect(actual).toMatchSnapshot()
})

test('Start on second round should work', () => {
  const action = startAction(13, ['John', 'Mary', 'Henry', 'Joe'], 2)
  const actual = reducer(null, action)
  expect(actual).toMatchSnapshot()
})

test('Replace current game should replace its state when state is undefined', () => {
  const gameState = {
    ...waitingBidState
  }
  const action = replaceCurrentGameAction(gameState)
  const actual = reducer(null, action)
  const expected = {
    ...waitingBidState
  }
  expect(actual).toEqual(expected)
})

test('Replace current game should work even current state is ended', () => {
  const state = {
    ...endedState
  }
  const gameState = {
    ...waitingWinState
  }
  const action = replaceCurrentGameAction(gameState)
  const actual = reducer(state, action)
  const expected = {
    ...waitingWinState
  }
  expect(actual).toEqual(expected)
})

test('Skip should do no-op when the state is null', () => {
  const expected = null
  const action = skipAction(1)
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
  const action = skipAction(1)
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
  const action = skipAction(1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Skip on last round should change state to ended', () => {
  const expected = {
    ...endedState,
    rounds: 1,
    scores: genMap([0], [0], [0], [0])
  }
  const state = {
    ...waitingBidState,
    rounds: 1
  }
  const action = skipAction(1)
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
  const action = skipAction(1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Set bid should do no-op when state is null', () => {
  const expected = null
  const action = setBidAction(genMap(0, 0, 0, 0))
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
  const action = setBidAction(genMap(0, 0, 0, 0))
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
  const action = setBidAction(genMap(0, 1, 0, 0))
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Set win should do no-op when state is null', () => {
  const expected = null
  const action = setWinAction(genMap(0, 0, 0, 0))
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
  const action = setWinAction(genMap(0, 0, 0, 0))
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
  const action = setWinAction(genMap(0, 1, 0, 0))
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Bid should do no-op when the state is null', () => {
  const expected = null
  const action = bidAction(genMap(0, 1, 0, 1))
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
  const action = bidAction(genMap(0, 1, 0, 1))
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
  const action = bidAction(genMap(0, 1, 0, 1))
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
  const action = bidAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Win should do no-op when state is null', () => {
  const expected = null
  const state = null
  const action = winAction(genMap(0, 1, 0, 0))
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
  const action = winAction(genMap(0, 1, 0, 0))
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
  const action = winAction(genMap(1, 0, 0, 0))
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
  const action = winAction(genMap(1, 0, 0, 0))
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
  const action = winAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Undo should do no-op when state is null', () => {
  const expected = null
  const state = null
  const action = undoAction()
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
  const action = undoAction()
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
  const action = undoAction()
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
  const action = undoAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should do no-op in null state', () => {
  const expected = null
  const state = null
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
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
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
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
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
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
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
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
  const newNames = genMap('John', 'DPGJW', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 13)
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
  const newNames = genReorderedMap('Mary', 'Henry', 'Joe', 'John')
  const action = changePlayersAction(newNames, 'b', 13)
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
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'c', 13)
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
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 12)
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
  const newNames = genSmallMap('John', 'Mary', 'Henry')
  const action = changePlayersAction(newNames, 'a', 13)
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
  const newNames = genNewMap('John', 'Mary', 'Henry', 'Joe', 'DPGJW')
  const action = changePlayersAction(newNames, 'b', 13)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Change players should end game when given rounds is less than current round', () => {
  const expected = {
    ...endedState,
    rounds: 1,
    scores: genMap([0], [0], [0], [0]),
    names: genMap('Mary', 'John', 'Henry', 'Joe')
  }
  const s = [0, 0] // Short hand for score
  const state = {
    ...waitingBidState,
    currentRound: 3,
    currentPlayerOrder: ['c', 'd', 'a', 'b'],
    scores: genMap(s, s, s, s)
  }
  const newNames = genMap('Mary', 'John', 'Henry', 'Joe')
  const action = changePlayersAction(newNames, 'a', 1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
