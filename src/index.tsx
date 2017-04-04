import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {createElement as h} from 'react'
import {render} from 'react-dom'

function App() {
  return <MuiThemeProvider>
    <span>Hello World</span>
  </MuiThemeProvider>
}

render(<App />, document.body)
