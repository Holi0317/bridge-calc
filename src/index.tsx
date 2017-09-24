import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Shell} from './shell'
import {i18n} from './app/i18n'
import {store} from './app/redux-store'
import {muiTheme} from './app/mui-theme'

function Root() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <MuiThemeProvider muiTheme={muiTheme}>
            <Shell />
          </MuiThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  )
}

render(<Root />, document.querySelector('.root'))
