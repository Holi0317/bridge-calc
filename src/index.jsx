import {DelegateContainer} from 'preact-delegate'
import {h, render} from 'preact'
import {Provider} from 'preact-redux'
import {BrowserRouter} from 'react-router-dom'
import {createStore, compose, applyMiddleware} from 'redux'
import {reducer} from './reducer/index'
import '../styles/styles.css'
import {App} from './app'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)

function Root() {
  return (
    <Provider store={store}>
      <DelegateContainer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DelegateContainer>
    </Provider>
  )
}

render(<Root />, document.body)
const spinner = document.querySelector('.splash')
document.body.removeChild(spinner)

if (process.env.NODE_ENV !== 'production') {
  require('preact/devtools')
}
