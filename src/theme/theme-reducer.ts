import {ThemeActions} from './actions'
import {ActionTypes} from '../action-types'

export interface IThemeState {
  /** Currently selected theme */
  theme: string
  /** Automatically turn on dark theme in dark environment? */
  autoDarkTheme: boolean
  /** Illumance (in lux) threshold for dark theme to operate */
  darkThreshold: number
}

const defaultState: IThemeState = {
  theme: 'default',
  autoDarkTheme: false,
  darkThreshold: 1000
}

export function themeReducer(state = defaultState, action: ThemeActions): IThemeState {
  const {type, ...props} = action

  if (type === ActionTypes.SET_THEME) {
    return {
      ...state,
      ...props
    }
  }

  return state
}
