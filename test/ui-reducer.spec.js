import test from 'ava'
import {SET_TITLE} from '../src/action'
import {ui as reducer} from '../src/reducer/ui'

test('Default state', t => {
  const expected = {
    title: 'Bridge calculator'
  }
  const actual = reducer(undefined, '')
  t.deepEqual(actual, expected, 'Default state tree should equal')
})

test('SET_TITLE should change title property', t => {
  const prevState = {
    title: 'Bridge calculator'
  }
  const action = {
    type: SET_TITLE,
    payload: 'Scoreboard'
  }
  const expected = {
    title: 'Scoreboard'
  }
  const actual = reducer(prevState, action)
  t.deepEqual(actual, expected, 'Title property should change')
})
