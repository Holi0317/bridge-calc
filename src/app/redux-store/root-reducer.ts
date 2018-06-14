import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import {currentGameReducer} from '../../score-input/reducer'
import {toastSingletonReducer} from '../../toast-singleton/toast-singleton-reducer'
import {entryReducer} from '../../entry/entry-reducer'
import {settingsReducer} from '../../score-input/settings/reducer'
import {prevGamesReducer} from '../../prev-games/prev-games-reducer'
import {themeReducer} from '../../theme/theme-reducer'

const presistConfig = {
  key: 'root',
  version: 1,
  debug: process.env.NODE_ENV === 'development',
  whitelist: ['prevGames', 'currentGame', 'theme'],
  storage
}

export const rootReducer = persistCombineReducers(presistConfig, {
  entry: entryReducer,
  gameSettings: settingsReducer,
  currentGame: currentGameReducer,
  prevGames: prevGamesReducer,
  toastSingleton: toastSingletonReducer,
  theme: themeReducer
})
