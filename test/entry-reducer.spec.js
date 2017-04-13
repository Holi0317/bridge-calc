import test from 'ava'
import {UI_ENTRY_OPTION_OPEN_TOGGLE, UI_ENTRY_ROUNDS_SET, UI_ENTRY_CARDS_SET, UI_ENTRY_PLAYER_NAMES_SET, UI_ENTRY_STARTING_ROUND_SET, UI_ENTRY_ADD_PLAYER} from '../src/action'
import {entry as reducer} from '../src/reducer/ui/entry'

const defaultState = {
  cards: 52,
  rounds: 13,
  startingRound: 1,
  playerNames: ['John', 'Mary', 'Henry', 'Joe'],
  optionsOpened: false
}

test('Default state', t => {
  const expected = {
    ...defaultState
  }
  const action = {
    type: undefined
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'Default state should equal')
})

test('Toggle option opened should flip false', t => {
  const state = {
    ...defaultState,
    optionsOpened: false
  }
  const expected = {
    ...defaultState,
    optionsOpened: true
  }
  const action = {
    type: UI_ENTRY_OPTION_OPEN_TOGGLE
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'optionsOpened property should flip')
})

test('Toggle option opened should flip true', t => {
  const state = {
    ...defaultState,
    optionsOpened: true
  }
  const expected = {
    ...defaultState,
    optionsOpened: false
  }
  const action = {
    type: UI_ENTRY_OPTION_OPEN_TOGGLE
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'optionsOpened property should flip')
})

test('Rounds should set when its action dispatched', t => {
  const expected = {
    ...defaultState,
    rounds: 5
  }
  const action = {
    type: UI_ENTRY_ROUNDS_SET,
    payload: 5
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'rounds property should set')
})

test('Number of cards should re-compute whenever rounds property when it is updated', t => {
  const expected = {
    ...defaultState,
    cards: 30,
    rounds: 7
  }
  const action = {
    type: UI_ENTRY_CARDS_SET,
    payload: 30
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'cards and rounds property should change')
})

test('Starting round should set when its action dispatched', t => {
  const expected = {
    ...defaultState,
    startingRound: 13
  }
  const action = {
    type: UI_ENTRY_STARTING_ROUND_SET,
    payload: 13
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'startingRound property should change')
})

test('Add player should append the new name to the last', t => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW']
  }
  const action = {
    type: UI_ENTRY_ADD_PLAYER,
    payload: 'DPGJW'
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'A name should append to the end of playerNames property')
})

test('Rounds should not re-compute on changing player names', t => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Joe', 'Henry', 'Mary']
  }
  const action = {
    type: UI_ENTRY_PLAYER_NAMES_SET,
    payload: ['John', 'Joe', 'Henry', 'Mary']
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'playerNames property should be updated')
})

test('Rounds should not re-compute on adding player when rounds < maxAvailableRounds', t => {
  const state = {
    ...defaultState,
    rounds: 8
  }
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 8
  }
  const action = {
    type: UI_ENTRY_PLAYER_NAMES_SET,
    payload: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW']
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Rounds should not re-compute and playerNames should changed')
})

test('Rounds should re-compute on adding player when rounds > maxAvailableRounds', t => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 10
  }
  const action = {
    type: UI_ENTRY_PLAYER_NAMES_SET,
    payload: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW']
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'Rounds should re-compute and playerNames should be changed')
})

test('Rounds should re-compute on removing player when rounds === maxPossibleRounds', t => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry'],
    rounds: 17
  }
  const action = {
    type: UI_ENTRY_PLAYER_NAMES_SET,
    payload: ['John', 'Mary', 'Henry']
  }
  const actual = reducer(undefined, action)
  t.deepEqual(actual, expected, 'Rounds should re-compute and playerNames should be changed')
})

test('Rounds should not re-compute on removing player when rounds < maxPossibleRounds', t => {
  const state = {
    ...defaultState,
    rounds: 10
  }
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry'],
    rounds: 10
  }
  const action = {
    type: UI_ENTRY_PLAYER_NAMES_SET,
    payload: ['John', 'Mary', 'Henry']
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Rounds should not re-compute and playerNames should not be changed')
})
