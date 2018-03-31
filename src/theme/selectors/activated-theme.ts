import {createSelector} from 'reselect'
import {selectedThemeSelector} from './selected-theme'
import {themes, defaultTheme} from '../color-presets'
import {ITheme} from '../types'

export const activatedThemeSelector = createSelector(
  selectedThemeSelector,
  (selectedTheme: string): ITheme =>
    themes.get(selectedTheme) || defaultTheme
)
