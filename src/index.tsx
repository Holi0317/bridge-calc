import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {createElement as h} from 'react'
import {render} from 'react-dom'
import {muiTheme} from './mui-theme'

function App() {
  return <MuiThemeProvider muiTheme={muiTheme}>
    <span>Hello World</span>
  </MuiThemeProvider>
}

render(<App />, document.body)
