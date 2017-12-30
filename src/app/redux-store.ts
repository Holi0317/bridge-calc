import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {currentGameReducer} from '../score-input/reducer'
import {prevGamesReducer} from '../prev-games/prev-games-reducer'
import {entryReducer} from '../entry/entry-reducer'
import {settingsReducer} from '../score-input/settings/reducer'
import {batchDispatch} from '../redux-middlewares/batch-dispatch'

const reducer = combineReducers({
  entry: entryReducer,
  gameSettings: settingsReducer,
  currentGame: currentGameReducer,
  prevGames: prevGamesReducer
})

const middlewares = [
  batchDispatch
]

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires no-implicit-dependencies
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)
