import {createMuiTheme, Theme} from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'
import lightBlue from '@material-ui/core/colors/lightBlue'
import blueGrey from '@material-ui/core/colors/blueGrey'

export const defaultTheme: Theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: teal
  }
})

const darkTheme: Theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: teal,
    type: 'dark'
  }
})

const indigoTheme: Theme = createMuiTheme()

const blueTheme: Theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink
  }
})

const greyTheme: Theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: pink
  }
})

export const themes: Map<string, Theme> = new Map([
  ['default', defaultTheme],
  ['dark', darkTheme],
  ['indigo', indigoTheme],
  ['blue', blueTheme],
  ['grey', greyTheme]
])
