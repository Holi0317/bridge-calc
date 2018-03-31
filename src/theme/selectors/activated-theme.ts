import {createSelector} from 'reselect'
import {defaultTheme, themes} from '../color-presets'
import {useDarkSelector} from './use-dark'
import {selectedThemeSelector} from './selected-theme'
import {IRootState} from '../../types'
import {ITheme} from '../types'

/**
 * Return theme according to current selection from redux state.
 * If the light level is lower than threshold and auto dark theme is enabled,
 * dark theme would be returned.
 */
export const activatedThemeSelector = createSelector(
  useDarkSelector,
  selectedThemeSelector,
  (useDark: boolean, selected: string): ITheme =>
    useDark
    ? themes.get('dark') || defaultTheme
    : themes.get(selected) || defaultTheme
)
