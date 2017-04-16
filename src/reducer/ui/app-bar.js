import {SET_TITLE} from '../../actions/ui/app-bar'

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
