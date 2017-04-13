import test from 'ava'
import {SET_TITLE} from '../src/action'
import {appBar as reducer} from '../src/reducer/ui/app-bar'

test('Default state', t => {
  const expected = {
    title: 'Bridge calculator'
  }
  const action = {
    type: undefined
  }
  const actual = reducer(undefined, action)
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
