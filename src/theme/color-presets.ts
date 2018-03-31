import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {pink500, pink700, tealA200, grey600, tealA400, tealA100} from 'material-ui/styles/colors'
import {MuiTheme} from 'material-ui/styles'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export const defaultTheme: MuiTheme = getMuiTheme({
  palette: {
    primary1Color: pink500,
    primary2Color: pink700,
    accent1Color: tealA200
  }
})

const darkTheme: MuiTheme = getMuiTheme(darkBaseTheme, {
  palette: {
    primary1Color: pink700,
    primary2Color: pink700,
    primary3Color: grey600,
    accent1Color: tealA200,
    accent2Color: tealA400,
    accent3Color: tealA100,
  }
})

const tealTheme: MuiTheme = getMuiTheme()

export const themes: Map<string, MuiTheme> = new Map([
  ['default', defaultTheme],
  ['dark', darkTheme],
  ['teal', tealTheme]
])
