import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {App} from './components/app'
import {i18n} from './i18n'
import {store} from './redux-store'

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

render(<Root />, document.querySelector('.root'))
