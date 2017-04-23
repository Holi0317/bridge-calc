// @flow
import {combineReducers} from 'redux'
import {ui} from './ui'
import {currentGame} from './current-game'

export const reducer = combineReducers({
  ui,
  currentGame
})
