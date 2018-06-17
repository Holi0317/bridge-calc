import {ISetThemeAction} from './set-theme'
import {IToggleDarkAction} from './toggle-dark'

export type ThemeActions =
  | ISetThemeAction
  | IToggleDarkAction
