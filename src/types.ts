import {CurrentGameActions} from './actions/current-game'
import {EntryActions} from './entry/entry-actions'
import {GameState} from './score-input/reducer'
import {IEntryState} from './entry/entry-reducer'
import {ISettingsState} from './score-input/settings/reducer'
import {SettingsActions} from './actions/ui/settings'
import {TranslationFunction} from 'i18next'

export interface IPlayerMap<T> {[playerID: string]: T}

export type I18nT = TranslationFunction

export interface ITranslateMixin {
  t: TranslationFunction
}

export interface IDropdownSource<T> {
  value: T,
  label: string,
  disabled?: boolean
}

export interface IRootState {
  currentGame: GameState,
  entry: IEntryState,
  gameSettings: ISettingsState
}

export type Actions =
  | CurrentGameActions
  | EntryActions
  | SettingsActions

export type Dispatch = (action: Actions) => void
