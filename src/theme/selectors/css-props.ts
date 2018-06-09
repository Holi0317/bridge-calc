import {createSelector} from 'reselect'
import {activatedThemeSelector} from './activated-theme'
import {Theme} from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import {light as lightPalette} from '@material-ui/core/styles/createPalette'
import {fade} from '@material-ui/core/styles/colorManipulator'

const white = '#fff'
const darkBlack = 'rgba(0, 0, 0, 0.87)'
const fullWhite = 'rgba(255, 255, 255, 1)'

/**
 * Select a mapping of css properties to values according to selected theme.
 */
export const cssPropsSelector = createSelector(
  activatedThemeSelector,
  (theme: Theme): Map<string, string> => {
    const palette = (theme.palette || lightPalette)!
    return new Map([
      ['--bg-color', palette.background.default || white],
      ['--text-color', palette.text.primary || fullWhite],
      ['--hover-color', fade(palette.text.primary || darkBlack, 0.1)],
      ['--error-text-color', red[500]]
    ])
  }
)
