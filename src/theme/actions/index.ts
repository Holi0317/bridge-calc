import {ISetThemeAction} from './set-theme'
import {ISetAutoDarkAction} from './set-auto-dark'

export type ThemeActions =
  | ISetThemeAction
  | ISetAutoDarkAction
