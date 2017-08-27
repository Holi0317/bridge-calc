import {combineReducers} from 'redux'
import {ui} from './ui/index'
import {currentGame} from './current-game/index'

export const reducer = combineReducers({
  ui,
  currentGame
})
