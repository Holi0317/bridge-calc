import {CurrentGameActions} from './score-input/actions'
import {EntryActions} from './entry/actions'
import {GameState} from './score-input/reducer'
import {IEntryState} from './entry/entry-reducer'
import {ISettingsState} from './score-input/settings/reducer'
import {GameSettingsActions} from './score-input/settings/actions'
import {i18n, TranslationFunction} from 'i18next'
import {IPrevGamesState} from './prev-games/prev-games-reducer'
import {PrevGamesActions} from './prev-games/actions'
import {IToastSingletonState} from './toast-singleton/toast-singleton-reducer'

export interface IPlayerMap<T> {[playerID: string]: T}

export interface ITranslateMixin {
  t: TranslationFunction
  i18n: i18n
}

export interface IDropdownSource<T> {
  value: T,
  label: string,
  disabled?: boolean
}

export interface IRootState {
  currentGame: GameState,
  entry: IEntryState,
  gameSettings: ISettingsState,
  prevGames: IPrevGamesState,
  toastSingleton: IToastSingletonState
}

export type Actions =
  | CurrentGameActions
  | EntryActions
  | GameSettingsActions
  | PrevGamesActions

export type Dispatch = (action: Actions) => void
