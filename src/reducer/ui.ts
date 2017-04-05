import {Actions, SET_TITLE} from '../action'

export interface IUI {
  title: string
}

const defaultState: IUI = {
  title: 'Bridge calculator'
}

export function ui(state = defaultState, action: Actions): IUI {
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
