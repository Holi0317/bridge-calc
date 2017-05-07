import test from 'ava'
import {START, SKIP, SET_BID, BID, SET_WIN, WIN, UNDO} from '../../src/actions/current-game'
import {currentGame as reducer} from '../../src/reducer/current-game/index'
import {startParams, waitingBidState, waitingWinState, endedState} from '../fixtures/current-game-states'

test('Default state should be null', t => {
  const expected = null
  const actual = reducer(undefined, {type: ''})
  t.is(expected, actual, 'Default state should be null')
})

test('Production of default basic state after start', t => {
  const expected = {
    ...waitingBidState
  }
  const action = {
    type: START,
    ...startParams
  }
  const actual = reducer(null, action)
  t.deepEqual(actual, expected, 'Default state of entry options should produce basic state')
})

test('Start on second round should work', t => {
  const expected = {
    ...waitingBidState,
    scores: {
      a: [0],
      b: [0],
      c: [0],
      d: [0]
    },
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2
  }
  const action = {
    type: START,
    ...startParams,
    startingRound: 2
  }
  const actual = reducer(null, action)
  t.deepEqual(actual, expected, 'Start should be able to handle starting from second round')
})

test('Skip should do no-op when the state is null', t => {
  const expected = null
  const action = {
    type: SKIP,
    time: new Date(1)
  }
  const actual = reducer(null, action)
  t.is(actual, expected, 'Null should be the new state')
})

test('Skip should skip 1 round if no payload is supplied', t => {
  const expected = {
    ...waitingBidState,
    scores: {
      a: [0],
      b: [0],
      c: [0],
      d: [0]
    },
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
  t.deepEqual(actual, expected, '1 round should be skipped')
})

test('Skip should reset bid and win data', t => {
  const expected = {
    ...waitingBidState,
    scores: {
      a: [0],
      b: [0],
      c: [0],
      d: [0]
    },
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2
  }
  const state = {
    ...waitingWinState,
    bid: {a: 0, b: 1, c: 0, d: 1},
    win: {a: 0, b: 1, c: 0, d: 0}
  }
  const action = {
    type: SKIP,
    times: 1,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Win and bid properties should reset')
})

test('Skip on last round should change state to ended', t => {
  const expected = {
    ...endedState,
    rounds: 2,
    scores: {
      a: [0],
      b: [0],
      c: [0],
      d: [0]
    }
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
  t.deepEqual(actual, expected, 'Stage should be ended')
})

test('Skip on ended state should do no-op', t => {
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
  t.deepEqual(actual, expected, 'State should not be modified')
})

test('Set bid should do no-op when state is null', t => {
  const expected = null
  const action = {
    type: SET_BID,
    payload: {a: 0}
  }
  const actual = reducer(null, action)
  t.is(actual, expected, 'Null should be the new state')
})

test('Set bid should do no-op when stage is ended', t => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: SET_BID,
    payload: {a: 0}
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'State should not be modified')
})

test('Set bid should set bid property', t => {
  const expected = {
    ...waitingBidState,
    bid: {a: 0, b: 1}
  }
  const state = {
    ...waitingBidState,
    bid: {a: 0}
  }
  const action = {
    type: SET_BID,
    payload: {a: 0, b: 1}
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Bid property should be set')
})

test('Set win should do no-op when state is null', t => {
  const expected = null
  const action = {
    type: SET_WIN,
    payload: {a: 0}
  }
  const actual = reducer(null, action)
  t.is(actual, expected, 'Null should be the new state')
})

test('Set win should do no-op when stage is ended', t => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: SET_WIN,
    payload: {a: 0}
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'State should not be modified')
})

test('Set win should set win property', t => {
  const expected = {
    ...waitingWinState,
    win: {a: 0, b: 1}
  }
  const state = {
    ...waitingWinState,
    win: {a: 0}
  }
  const action = {
    type: SET_WIN,
    payload: {a: 0, b: 1}
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Win property should be set')
})

test('Bid should do no-op when the state is null', t => {
  const expected = null
  const action = {
    type: BID,
    payload: {a: 0, b: 1, c: 0, d: 1}
  }
  const actual = reducer(null, action)
  t.is(actual, expected, 'Null should be the new state')
})

test('Bid should do no-op when game stage is ended', t => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: BID,
    payload: {a: 0, b: 1, c: 0, d: 1}
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'No-op should be done')
})

test('Bid should change stage to waitingWin', t => {
  const expected = {
    ...waitingWinState,
    bid: {a: 0, b: 1, c: 0, d: 1}
  }
  const state = {
    ...waitingBidState,
    bid: {a: 0}
  }
  const action = {
    type: BID,
    payload: {a: 0, b: 1, c: 0, d: 1}
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'WaitingWin object should be returned')
})

test('Bid should use data from currentGame.bid when bid is not given in payload', t => {
  const expected = {
    ...waitingWinState,
    bid: {a: 0, b: 1, c: 0, d: 1}
  }
  const state = {
    ...waitingBidState,
    bid: {a: 0, b: 1, c: 0, d: 1}
  }
  const action = {
    type: BID
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'WaitingWin object should be returned')
})

test('Win should do no-op when state is null', t => {
  const expected = null
  const state = null
  const action = {
    type: WIN,
    win: {a: 0, b: 1, c: 0, d: 0},
    time: new Date(1)
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'No-op should be done')
})

test('Win should do no-op when game stage is ended', t => {
  const expected = {
    ...endedState
  }
  const state = {
    ...endedState
  }
  const action = {
    type: WIN,
    win: {a: 0, b: 1, c: 0, d: 0},
    time: new Date(1)
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'No-op should be done')
})

test('Win should change stage to waitingBid', t => {
  const expected = {
    ...waitingBidState,
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2,
    scores: {
      a: [11],
      b: [10],
      c: [10],
      d: [-1]
    }
  }
  const state = {
    ...waitingWinState,
    bid: {a: 1, b: 0, c: 0, d: 1}
  }
  const action = {
    type: WIN,
    win: {a: 1, b: 0, c: 0, d: 0},
    time: new Date(1)
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'waitingBid object for new round should be returned')
})

test('Win should change stage to ended for last round', t => {
  const expected = {
    ...endedState,
    rounds: 1,
    scores: {
      a: [11],
      b: [10],
      c: [10],
      d: [-1]
    }
  }
  const state = {
    ...waitingWinState,
    rounds: 1,
    bid: {a: 1, b: 0, c: 0, d: 1}
  }
  const action = {
    type: WIN,
    win: {a: 1, b: 0, c: 0, d: 0},
    time: new Date(1)
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'game should be ended')
})

test('Win should use data from gameStage.win if win is not given in action', t => {
  const expected = {
    ...waitingBidState,
    currentPlayerOrder: ['b', 'c', 'd', 'a'],
    currentRound: 2,
    scores: {
      a: [11],
      b: [10],
      c: [10],
      d: [-1]
    }
  }
  const state = {
    ...waitingWinState,
    bid: {a: 1, b: 0, c: 0, d: 1},
    win: {a: 1, b: 0, c: 0, d: 0}
  }
  const action = {
    type: WIN,
    time: new Date(1)
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'waitingBid object for new round should be returned')
})

test('Undo should do no-op when state is null', t => {
  const expected = null
  const state = null
  const action = {
    type: UNDO
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'No-op should be done')
})

test('Undo should do no-op when stage is ended', t => {
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
  t.deepEqual(actual, expected, 'No-op should be done')
})

test('Undo should do no-op when stage is waitingBid', t => {
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
  t.deepEqual(actual, expected, 'No-op should be done')
})

test('Undo should roll back stage is waitingWin', t => {
  const expected = {
    ...waitingBidState,
    bid: {a: 0, b: 0, c: 0, d: 0}
  }
  const state = {
    ...waitingWinState,
    bid: {a: 0, b: 0, c: 0, d: 0}
  }
  const action = {
    type: UNDO
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Stage should be waitingWin')
})
