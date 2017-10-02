import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {currentGameReducer} from '../score-input/reducer'
import {entryReducer} from '../entry/entry-reducer'
import {settingsReducer} from '../score-input/settings/reducer'

const reducer = combineReducers({
  ui: combineReducers({
    entry: entryReducer,
    settings: settingsReducer
  }),
  currentGame: currentGameReducer
})

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
