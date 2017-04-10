import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {DelegateContainer} from 'preact-delegate'
import {h, render} from 'preact'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {muiTheme} from './mui-theme'
import {reducer} from './reducer/index'

import '../styles/styles.scss'
import {App} from './app'

const store = createStore(reducer)

function Root() {
  return (
    <Provider store={store}>
      <DelegateContainer>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MuiThemeProvider>
      </DelegateContainer>
    </Provider>
  )
}

render(<Root />, document.body)
const spinner = document.querySelector('.splash')
document.body.removeChild(spinner)
