// @flow
import {SET_TITLE} from '../../actions/ui/app-bar'
import type {AppBarActions} from '../../actions/ui/app-bar'

export type AppBarState = {
  title: string
}

const defaultState: AppBarState = {
  title: 'Bridge calculator'
}

export function appBar(state: AppBarState = defaultState, action: AppBarActions) {
  switch (action.type) {
  case SET_TITLE:
    return {
      ...state,
      title: action.payload
    }
  default:
    return state
  }
}
