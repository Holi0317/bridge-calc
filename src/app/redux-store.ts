import {persistStore, persistCombineReducers} from 'redux-persist'
import {applyMiddleware, createStore, compose} from 'redux'
import storage from 'redux-persist/es/storage'
import {autoSave} from '../redux-middlewares/auto-save'
import {currentGameReducer} from '../score-input/reducer'
import {prevGamesReducer} from '../prev-games/prev-games-reducer'
import {entryReducer} from '../entry/entry-reducer'
import {settingsReducer} from '../score-input/settings/reducer'
import {toastSingletonReducer} from '../toast-singleton/toast-singleton-reducer'
import {themeReducer} from '../theme/theme-reducer'

const presistConfig = {
  key: 'root',
  version: 1,
  debug: process.env.NODE_ENV === 'development',
  whitelist: ['prevGames', 'currentGame', 'theme'],
  storage
}

const reducer = persistCombineReducers(presistConfig, {
  entry: entryReducer,
  gameSettings: settingsReducer,
  currentGame: currentGameReducer,
  prevGames: prevGamesReducer,
  toastSingleton: toastSingletonReducer,
  theme: themeReducer
})

/*
 * Default set of middlewares would be applied to both
 * production and development environment
 */
const middlewares: any[] = [
  autoSave
]

function devEnhancer() {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // tslint:disable-next-line:no-var-requires no-implicit-dependencies no-require-imports
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  return composeEnhancers(
    applyMiddleware(...[...middlewares, logger])
  )
}

function prodEnchancer() {
  return applyMiddleware(...middlewares)
}

export const store = createStore(
  reducer,
  process.env.NODE_ENV === 'production' ? prodEnchancer() : devEnhancer()
)
export const persistor = persistStore(store)
