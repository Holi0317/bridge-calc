import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import {ThemeProvider} from './theme/theme-provider'
import {PersistGate} from 'redux-persist/es/integration/react'
import {HttpsRedirect} from './https-redirect'
import {Shell} from './shell'
import {i18n} from './app/i18n'
import {store, persistor} from './app/redux-store'
import {ErrorBoundary} from './error-boundary'
import {basenameProcess} from './utils/basename-process'

function Root() {
  return (
    <HttpsRedirect>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider>
              <BrowserRouter basename={basenameProcess(document.baseURI || '/')}>
                <ErrorBoundary>
                  <Shell />
                </ErrorBoundary>
              </BrowserRouter>
            </ThemeProvider>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </HttpsRedirect>
  )
}

ReactDOM.render(<Root />, document.querySelector('.root'))
