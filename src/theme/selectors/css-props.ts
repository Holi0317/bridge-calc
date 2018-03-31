import {createSelector} from 'reselect'
import {activatedThemeSelector} from './activated-theme'
import {MuiTheme} from 'material-ui/styles'
import {fullWhite, white, darkBlack} from 'material-ui/styles/colors'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {fade} from 'material-ui/utils/colorManipulator'

/**
 * Select a mapping of css properties to values according to selected theme.
 */
export const cssPropsSelector = createSelector(
  activatedThemeSelector,
  (theme: MuiTheme): Map<string, string> => {
    const palette = (theme.palette || lightBaseTheme.palette)!
    return new Map([
      ['--bg-color', palette.canvasColor || white],
      ['--text-color', palette.textColor || fullWhite],
      ['--hover-color', fade(palette.textColor || darkBlack, 0.1)]
    ])
  }
)
