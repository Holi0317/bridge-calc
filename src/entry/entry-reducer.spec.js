import {entryReducer as reducer} from './entry-reducer'
import {defaultState} from '../../test-fixtures/entry-options'
import {toggleOptionOpenAction} from './actions/toggle-option-open'
import {setRoundsAction} from './actions/set-rounds'
import {setStartingRoundAction} from './actions/set-starting-round'
import {addPlayerAction} from './actions/add-player'
import {setPlayerNamesAction} from './actions/set-player-names'
import {resetAction} from './actions/reset'

test('Default state', () => {
  const expected = {
    ...defaultState
  }
  const action = {
    type: '#NULL'
  }
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Toggle option opened should flip false', () => {
  const state = {
    ...defaultState,
    optionsOpened: false
  }
  const expected = {
    ...defaultState,
    optionsOpened: true
  }
  const action = toggleOptionOpenAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Toggle option opened should flip true', () => {
  const state = {
    ...defaultState,
    optionsOpened: true
  }
  const expected = {
    ...defaultState,
    optionsOpened: false
  }
  const action = toggleOptionOpenAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Rounds should set when its action dispatched', () => {
  const expected = {
    ...defaultState,
    rounds: 5
  }
  const action = setRoundsAction(5)
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Setting rounds should reset startingRound if the new state will cause startingRound invalid', () => {
  const state = {
    ...defaultState,
    startingRound: 13
  }
  const expected = {
    ...defaultState,
    rounds: 10
  }
  const action = setRoundsAction(10)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Starting round should set when its action dispatched', () => {
  const expected = {
    ...defaultState,
    startingRound: 13
  }
  const action = setStartingRoundAction(13)
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Add player should append the new name to the last and re-compute rounds', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 10
  }
  const action = addPlayerAction('DPGJW')
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Add player should not re-compute rounds when rounds < maxAvailableRounds', () => {
  const state = {
    ...defaultState,
    rounds: 8
  }
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 8
  }
  const action = addPlayerAction('DPGJW')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Rounds should not re-compute on changing player names', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Joe', 'Henry', 'Mary']
  }
  const action = setPlayerNamesAction(['John', 'Joe', 'Henry', 'Mary'])
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Rounds should not re-compute on adding player when rounds < maxAvailableRounds', () => {
  const state = {
    ...defaultState,
    rounds: 8
  }
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 8
  }
  const action = setPlayerNamesAction(['John', 'Mary', 'Henry', 'Joe', 'DPGJW'])
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Rounds should re-compute on adding player when rounds > maxAvailableRounds', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 10
  }
  const action = setPlayerNamesAction(['John', 'Mary', 'Henry', 'Joe', 'DPGJW'])
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Rounds should re-compute on removing player when rounds === maxPossibleRounds', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry'],
    rounds: 17
  }
  const action = setPlayerNamesAction(['John', 'Mary', 'Henry'])
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Rounds should not re-compute on removing player when rounds < maxPossibleRounds', () => {
  const state = {
    ...defaultState,
    rounds: 10
  }
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry'],
    rounds: 10
  }
  const action = setPlayerNamesAction(['John', 'Mary', 'Henry'])
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Reset state should reset state', () => {
  const state = {
    ...defaultState,
    rounds: 8,
    optionsOpened: true
  }
  const expected = {
    ...defaultState
  }
  const action = resetAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
