import {combineReducers} from 'redux'
import {IUI, ui} from './ui'

export interface IState {
  ui: IUI
}

export const reducer = combineReducers({
  ui
})
