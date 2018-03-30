import {ActionTypes} from '../../action-types'

export interface ISetThemeAction {
  type: ActionTypes.SET_THEME
  theme?: string
  darkThreshold?: number
  currentIllumance?: number | null
}

/**
 * Set theme of the app.
 * See theme-sources.ts for available themes.
 */
export function setThemeAction(theme: string): ISetThemeAction {
  return {type: ActionTypes.SET_THEME, theme}
}

/**
 * Set threshold for dark theme to activate.
 * Unit for this is lux.
 * If auto dark is disabled, this number will have no use.
 */
export function setDarkThresholdAction(darkThreshold: number): ISetThemeAction {
  return {type: ActionTypes.SET_THEME, darkThreshold}
}

/**
 * Set current illumance received from light sensor.
 * If light sensor is not available, null should be set.
 * Unit for illumance is lux.
 */
export function setIllumanceAction(illumance: number | null): ISetThemeAction {
  return {type: ActionTypes.SET_THEME, currentIllumance: illumance}
}
