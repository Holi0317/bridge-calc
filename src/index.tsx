import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {DelegateContainer} from 'preact-delegate'
import {createElement as h} from 'react'
import {render} from 'react-dom'
import {muiTheme} from './mui-theme'

function App() {
  return (
    <DelegateContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        <span>Hello World</span>
      </MuiThemeProvider>
    </DelegateContainer>
  )
}

render(<App />, document.body)
