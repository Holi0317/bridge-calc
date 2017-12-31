import {settingsReducer as reducer} from './reducer'
import {defaultState} from '../../../test-fixtures/settings-state'
import {endedState, genMap, waitingBidState} from '../../../test-fixtures/current-game-states'
import {initSettingsAction} from './actions/init-settings'
import {setMakerAction} from './actions/set-maker'
import {setNamesAction} from './actions/set-names'
import {addNameAction} from './actions/add-name'

jest.mock('cuid', () => {
  let count = 0
  return jest.fn(() => '' + count++)
})

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

test('INIT_SETTINGS should return default state on null game state', () => {
  const state = null
  const expected = {
    ...defaultState
  }
  const action = initSettingsAction(null)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('INIT_SETTINGS should return default state on ended game stage', () => {
  const state = null
  const expected = {
    ...defaultState
  }
  const action = initSettingsAction(endedState)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('INIT_SETTINGS should work on running game state', () => {
  const state = null
  const expected = {
    maker: 'a',
    names: genMap('John', 'Mary', 'Henry', 'Joe')
  }
  const action = initSettingsAction(waitingBidState)
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
  const action = setMakerAction('b')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('SET_NAMES should set names', () => {
  const names = genMap('Mary', 'John', 'Henry', 'Joe')
  const state = {
    ...defaultState
  }
  const expected = {
    ...defaultState,
    names
  }
  const action = setNamesAction(names)
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
      0: 'DPGJW'
    }
  }
  const action = addNameAction('DPGJW')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
