import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {pink500, pink700, tealA200, grey600, tealA400, tealA100, fullWhite} from 'material-ui/styles/colors'
import {ITheme} from './types'

export const defaultTheme: ITheme = {
  mui: getMuiTheme({
    palette: {
      primary1Color: pink500,
      primary2Color: pink700,
      accent1Color: tealA200
    }
  }),
  backgroundColor: 'white'
}

const darkTheme: ITheme = {
  mui: getMuiTheme({
    palette: {
      primary1Color: pink700,
      primary2Color: pink700,
      primary3Color: grey600,
      accent1Color: tealA200,
      accent2Color: tealA400,
      accent3Color: tealA100,
      textColor: fullWhite,
      canvasColor: '#303030'
    }
  }),
  backgroundColor: '#303030'
}

const tealTheme: ITheme = {
  mui: getMuiTheme(),
  backgroundColor: 'white'
}

export const themes: Map<string, ITheme> = new Map([
  ['default', defaultTheme],
  ['dark', darkTheme],
  ['teal', tealTheme]
])
