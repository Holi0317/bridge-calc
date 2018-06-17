/**
 * Color presets for the whole application.
 * For each presets, please do not specify its palette type.
 * The field would be filled in by state selector.
 */

import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'
import lightBlue from '@material-ui/core/colors/lightBlue'
import blueGrey from '@material-ui/core/colors/blueGrey'
import indigo from '@material-ui/core/colors/indigo'

export const pinkTheme: ThemeOptions = {
  palette: {
    primary: pink,
    secondary: teal
  }
}

const indigoTheme: ThemeOptions = {
  palette: {
    primary: indigo,
    secondary: pink
  }
}

const blueTheme: ThemeOptions = {
  palette: {
    primary: lightBlue,
    secondary: pink
  }
}

const greyTheme: ThemeOptions = {
  palette: {
    primary: blueGrey,
    secondary: pink
  }
}

export const themes: Map<string, ThemeOptions> = new Map([
  ['Pink', pinkTheme],
  ['Indigo', indigoTheme],
  ['Light blue', blueTheme],
  ['Blue Grey', greyTheme]
])
