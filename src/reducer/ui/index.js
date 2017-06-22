// @flow
import {combineReducers} from 'redux'
import {entry} from './entry'
import {settings} from './settings'

export const ui = combineReducers({
  entry,
  settings
})
