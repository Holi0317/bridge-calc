import test from 'ava'
import {settings as reducer} from '../../src/reducer/ui/settings'
import {defaultState} from '../fixtures/settings-state'
import {ADD_NAME, SET_BY_GAME_STATE, SET_MAKER, SET_NAMES} from '../../src/actions/ui/settings'
import {endedState, genMap, waitingBidState} from '../fixtures/current-game-states'

test('Default state', t => {
  const state = undefined
  const expected = {
    ...defaultState
  }
  const action = {
    type: '#NULL'
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Default state should match')
})

test('SET_BY_GAME_STATE should return default state on null game state', t => {
  const state = null
  const expected = {
    ...defaultState
  }
  const action = {
    type: SET_BY_GAME_STATE,
    state: null
  }
  const actual = reducer(state, action)
  t.deepEqual(actual, expected, 'Default state should be returned')
})

test('SET_BY_GAME_STATE should return default state on ended game stage', t => {
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
  t.deepEqual(actual, expected, 'Default state should be returned')
})

test('SET_BY_GAME_STATE should work on running game state', t => {
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
  t.deepEqual(actual, expected, 'Settings state should be populated according to given state')
})

test('SET_MAKER should set maker', t => {
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
  t.deepEqual(actual, expected, 'Maker property should be changed')
})

test('SET_NAMES should set names', t => {
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
  t.deepEqual(actual, expected, 'Names should be changed')
})

test('ADD_NAME should append new name to the end', t => {
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
  t.deepEqual(actual, expected, 'New name should be appended to the end of the list')
})
