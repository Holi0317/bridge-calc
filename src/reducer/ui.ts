import {Actions, SET_BACK_DISPLAY, SET_TITLE} from '../action'

export interface IUI {
  title: string
  showBack: boolean
}

const defaultState: IUI = {
  title: 'Bridge calculator',
  showBack: false
}

export function ui(state = defaultState, action: Actions): IUI {
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
