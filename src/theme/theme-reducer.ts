import {ThemeActions} from './actions'
import {ActionTypes} from '../action-types'

export interface IThemeState {
  /** Currently selected theme */
  theme: string
}

const defaultState: IThemeState = {
  theme: 'default'
}

export function themeReducer(state = defaultState, action: ThemeActions): IThemeState {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        theme: action.theme
      }
    default:
      return state
  }
}
