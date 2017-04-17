import {h, render} from 'preact'
import {Provider} from 'preact-redux'
import {BrowserRouter} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import {createStore, compose, applyMiddleware} from 'redux'
import {reducer} from './reducer/index'
import '../styles/styles.css'
import {App} from './components/app'
import {i18n} from './i18n'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
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
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  )
}

render(<Root />, document.body)
const spinner = document.querySelector('.splash')
document.body.removeChild(spinner)

if (process.env.NODE_ENV !== 'production') {
  require('preact/devtools')
}
