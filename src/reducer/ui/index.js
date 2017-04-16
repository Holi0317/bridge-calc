// @flow
import {combineReducers} from 'redux'
import {appBar} from './app-bar'
import {entry} from './entry'

export const ui = combineReducers({
  appBar,
  entry
})
