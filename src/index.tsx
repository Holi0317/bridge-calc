import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {DelegateContainer} from 'preact-delegate'
import {createElement as h} from 'react'
import {render} from 'react-dom'
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
