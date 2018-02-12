import {ActionTypes} from '../../action-types'

export interface ISetThemeAction {
  type: ActionTypes.SET_THEME
  theme?: string
  autoDarkTheme?: boolean
  darkThreshold?: number
}

export function setThemeAction(theme: string): ISetThemeAction {
  return {type: ActionTypes.SET_THEME, theme}
}

export function setAutoDarkThemeAction(autoDarkTheme: boolean): ISetThemeAction {
  return {type: ActionTypes.SET_THEME, autoDarkTheme}
}

export function setDarkThresholdAction(darkThreshold: number): ISetThemeAction {
  return {type: ActionTypes.SET_THEME, darkThreshold}
}
