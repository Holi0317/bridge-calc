// @flow
import {combineReducers} from 'redux'
import {entry} from '../../entry/entry-reducer'
import {settings} from './settings'

export const ui = combineReducers({
  entry,
  settings
})
