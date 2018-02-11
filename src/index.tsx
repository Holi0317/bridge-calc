import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {PersistGate} from 'redux-persist/es/integration/react'
import {HttpsRedirect} from './https-redirect'
import {Shell} from './shell'
import {i18n} from './app/i18n'
import {store, persistor} from './app/redux-store'
import {muiTheme} from './app/mui-theme'
import {ErrorBoundary} from './error-boundary'
import {basenameProcess} from './utils/basename-process'

function Root() {
  return (
    <HttpsRedirect>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter basename={basenameProcess(document.baseURI || '/')}>
              <MuiThemeProvider muiTheme={muiTheme}>
                <ErrorBoundary>
                  <Shell />
                </ErrorBoundary>
              </MuiThemeProvider>
            </BrowserRouter>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </HttpsRedirect>
  )
}

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires no-implicit-dependencies no-require-imports
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(<Root />, document.querySelector('.root'))
