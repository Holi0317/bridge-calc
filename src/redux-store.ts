import {applyMiddleware, compose, createStore} from 'redux'
import {reducer} from './reducer/index'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)
