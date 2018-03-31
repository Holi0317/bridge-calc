import {createSelector} from 'reselect'
import {selectedThemeSelector} from './selected-theme'
import {themes, defaultTheme} from '../color-presets'
import {MuiTheme} from 'material-ui/styles'

export const activatedThemeSelector = createSelector(
  selectedThemeSelector,
  (selectedTheme: string): MuiTheme =>
    themes.get(selectedTheme) || defaultTheme
)
