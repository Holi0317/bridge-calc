import {entryReducer as reducer} from './entry-reducer'
import {defaultState} from '../../test-fixtures/entry-options'
import {toggleOptionOpen} from './actions/toggle-option-open'
import {setRounds} from './actions/set-rounds'
import {setCards} from './actions/set-cards'
import {setStartingRound} from './actions/set-starting-round'
import {addPlayer} from './actions/add-player'
import {setPlayerNames} from './actions/set-player-names'
import {reset} from './actions/reset'

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
  const action = toggleOptionOpen()
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
  const action = toggleOptionOpen()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Rounds should set when its action dispatched', () => {
  const expected = {
    ...defaultState,
    rounds: 5
  }
  const action = setRounds(5)
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
  const action = setRounds(10)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Number of cards should re-compute whenever rounds property when it is updated', () => {
  const expected = {
    ...defaultState,
    cards: 30,
    rounds: 7
  }
  const action = setCards(30)
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Starting round should set when its action dispatched', () => {
  const expected = {
    ...defaultState,
    startingRound: 13
  }
  const action = setStartingRound(13)
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Add player should append the new name to the last and re-compute rounds', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 10
  }
  const action = addPlayer('DPGJW')
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
  const action = addPlayer('DPGJW')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Rounds should not re-compute on changing player names', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Joe', 'Henry', 'Mary']
  }
  const action = setPlayerNames(['John', 'Joe', 'Henry', 'Mary'])
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
  const action = setPlayerNames(['John', 'Mary', 'Henry', 'Joe', 'DPGJW'])
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('Rounds should re-compute on adding player when rounds > maxAvailableRounds', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry', 'Joe', 'DPGJW'],
    rounds: 10
  }
  const action = setPlayerNames(['John', 'Mary', 'Henry', 'Joe', 'DPGJW'])
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('Rounds should re-compute on removing player when rounds === maxPossibleRounds', () => {
  const expected = {
    ...defaultState,
    playerNames: ['John', 'Mary', 'Henry'],
    rounds: 17
  }
  const action = setPlayerNames(['John', 'Mary', 'Henry'])
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
  const action = setPlayerNames(['John', 'Mary', 'Henry'])
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
  const action = reset()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
