import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {currentGameReducer} from '../score-input/reducer'
import {entryReducer} from '../entry'
import {settingsReducer} from '../score-input/settings'
import {prevGamesReducer} from '../prev-games/prev-games-reducer'

const reducer = combineReducers({
  entry: entryReducer,
  gameSettings: settingsReducer,
  currentGame: currentGameReducer,
  prevGames: prevGamesReducer
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
