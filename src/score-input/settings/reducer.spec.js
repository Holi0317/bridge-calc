import {settingsReducer as reducer} from './reducer'
import {ADD_NAME, SET_BY_GAME_STATE, SET_MAKER, SET_NAMES} from './game-settings-actions'
import {defaultState} from '../../../test-fixtures/settings-state'
import {endedState, genMap, waitingBidState} from '../../../test-fixtures/current-game-states'

test('Default state', () => {
  const state = undefined
  const expected = {
    ...defaultState
  }
  const action = {
    type: '#NULL'
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('SET_BY_GAME_STATE should return default state on null game state', () => {
  const state = null
  const expected = {
    ...defaultState
  }
  const action = {
    type: SET_BY_GAME_STATE,
    state: null
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('SET_BY_GAME_STATE should return default state on ended game stage', () => {
  const state = null
  const expected = {
    ...defaultState
  }
  const action = {
    type: SET_BY_GAME_STATE,
    state: {
      ...endedState
    }
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('SET_BY_GAME_STATE should work on running game state', () => {
  const state = null
  const expected = {
    maker: 'a',
    names: genMap('John', 'Mary', 'Henry', 'Joe')
  }
  const action = {
    type: SET_BY_GAME_STATE,
    state: {
      ...waitingBidState
    }
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('SET_MAKER should set maker', () => {
  const state = {
    ...defaultState
  }
  const expected = {
    ...defaultState,
    maker: 'b'
  }
  const action = {
    type: SET_MAKER,
    maker: 'b'
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('SET_NAMES should set names', () => {
  const state = {
    ...defaultState
  }
  const expected = {
    ...defaultState,
    names: genMap('Mary', 'John', 'Henry', 'Joe')
  }
  const action = {
    type: SET_NAMES,
    newNames: genMap('Mary', 'John', 'Henry', 'Joe')
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('ADD_NAME should append new name to the end', () => {
  const state = {
    ...defaultState
  }
  const expected = {
    ...defaultState,
    names: {
      e: 'DPGJW'
    }
  }
  const action = {
    type: ADD_NAME,
    name: 'DPGJW',
    ID: 'e'
  }
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
