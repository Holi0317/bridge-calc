import {SET_TITLE} from '../../action'

const defaultState = {
  title: 'Bridge calculator'
}

export function appBar(state = defaultState, action) {
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
