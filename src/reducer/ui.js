import {SET_BACK_DISPLAY, SET_TITLE} from '../action'

const defaultState = {
  title: 'Bridge calculator',
  showBack: false
}

export function ui(state = defaultState, action) {
  switch (action.type) {
  case SET_TITLE:
    return {
      ...state,
      title: action.payload
    }
  case SET_BACK_DISPLAY:
    return {
      ...state,
      showBack: action.payload
    }
  default:
    return state
  }
}
