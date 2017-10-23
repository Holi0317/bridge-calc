import {prevGamesReducer as reducer} from './prev-games-reducer'
import {addGameAction} from './actions/add-game'
import {deleteGameAction} from './actions/delete-game'
import {resetGamesAtion} from './actions/reset-games'

test('Default state', () => {
  const expected = {
    prevGames: []
  }
  const action = {
    type: '#NULL'
  }
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('add game action should prepend game to the head of prev games array', () => {
  const expected = {
    prevGames: ['d', 'a', 'b', 'c']
  }
  const state = {
    prevGames: ['a', 'b', 'c']
  }
  const action = addGameAction('d')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('delete game action should remove give game ID from prev games array', () => {
  const expected = {
    prevGames: ['a', 'c']
  }
  const state = {
    prevGames: ['a', 'b', 'c']
  }
  const action = deleteGameAction(1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('delete game action should do nothing if given game ID is not found', () => {
  const expected = {
    prevGames: ['a', 'b', 'c']
  }
  const state = {
    prevGames: ['a', 'b', 'c']
  }
  const action = deleteGameAction(3)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('State should reset after reset action is fired', () => {
  const expected = {
    prevGames: []
  }
  const state = {
    prevGames: [{}]
  }
  const action = resetGamesAtion()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
