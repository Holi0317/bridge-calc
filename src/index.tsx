import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {createStore, compose, applyMiddleware} from 'redux'
import {reducer} from './reducer/index'
import {App} from './components/app'
import {i18n} from './i18n'
import './styles/mdc.global.css'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)

function Root() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <MuiThemeProvider>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  )
}

render(<Root />, document.body)
