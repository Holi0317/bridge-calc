import {createSelector} from 'reselect'
import {activatedThemeSelector} from './activated-theme'
import {Theme} from '@material-ui/core/styles'

/**
 * Select a mapping of css properties to values according to selected theme.
 */
export const cssPropsSelector = createSelector(
  activatedThemeSelector,
  ({palette}: Theme): Map<string, string> => {
    return new Map([
      ['--bg-color', palette.background.default],
      ['--text-color', palette.text.primary],
      ['--secondary-text-color', palette.text.secondary],
      ['--selected-color', palette.action.selected],
      ['--error-text-color', palette.error.main],
      ['--contrast-text-color', palette.getContrastText(palette.background.default)]
    ])
  }
)
