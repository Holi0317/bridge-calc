import {createSelector} from 'reselect'
import {Theme} from '@material-ui/core/styles'
import {selectedThemeSelector} from './selected-theme'
import {themes, defaultTheme} from '../color-presets'

export const activatedThemeSelector = createSelector(
  selectedThemeSelector,
  (selectedTheme: string): Theme =>
    themes.get(selectedTheme) || defaultTheme
)
