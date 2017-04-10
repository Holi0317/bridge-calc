import {SET_BACK_DISPLAY} from '../action'

const defaultState = {
  title: 'Bridge calculator',
  showBack: false
}

export function ui(state = defaultState, action) {
  switch (action.type) {
  case SET_BACK_DISPLAY:
    return {
      ...state,
      showBack: action.payload
    }
  default:
    return state
  }
}
