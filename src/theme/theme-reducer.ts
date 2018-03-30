import {ThemeActions} from './actions'
import {ActionTypes} from '../action-types'

export interface IThemeState {
  /** Currently selected theme */
  theme: string
  /** Automatically turn on dark theme in dark environment? */
  autoDarkTheme: boolean
  /** Illumance (in lux) threshold for dark theme to operate */
  darkThreshold: number
  /** Current illuminance (in lux) detected. Null if sensor not available */
  currentIllumance: number | null
}

const defaultState: IThemeState = {
  theme: 'default',
  autoDarkTheme: false,
  darkThreshold: 1000,
  currentIllumance: null
}

export function themeReducer(state = defaultState, action: ThemeActions): IThemeState {
  switch (action.type) {
    case ActionTypes.SET_THEME: {
      const {type, ...props} = action
      return {
        ...state,
        ...props
      }
    }
    case ActionTypes.SET_AUTO_DARK:
      return {
        ...state,
        currentIllumance: action.payload
          ? state.currentIllumance
          : null,
        autoDarkTheme: action.payload
      }
    default:
      return state
  }
}
