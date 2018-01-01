import {persistStore, persistCombineReducers} from 'redux-persist'
import {applyMiddleware, createStore} from 'redux'
import storage from 'redux-persist/es/storage'
import {currentGameReducer} from '../score-input/reducer'
import {prevGamesReducer} from '../prev-games/prev-games-reducer'
import {entryReducer} from '../entry/entry-reducer'
import {settingsReducer} from '../score-input/settings/reducer'
import {toastSingletonReducer} from '../toast-singleton/toast-singleton-reducer'
import {autoSave} from '../redux-middlewares/auto-save'

const presistConfig = {
  key: 'root',
  version: 1,
  debug: process.env.NODE_ENV === 'development',
  whitelist: ['prevGames', 'currentGame'],
  storage
}

const reducer = persistCombineReducers(presistConfig, {
  entry: entryReducer,
  gameSettings: settingsReducer,
  currentGame: currentGameReducer,
  prevGames: prevGamesReducer,
  toastSingleton: toastSingletonReducer
})

const middlewares: any[] = [
  autoSave
]

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires no-implicit-dependencies
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

export const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)
export const persistor = persistStore(store)
