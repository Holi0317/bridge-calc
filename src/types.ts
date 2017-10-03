import {CurrentGameActions} from './score-input/score-input-actions'
import {EntryActions} from './entry/entry-actions'
import {GameState} from './score-input/reducer'
import {IEntryState} from './entry/entry-reducer'
import {ISettingsState} from './score-input/settings/reducer'
import {GameSettingsActions} from './score-input/settings/game-settings-actions'
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
  | GameSettingsActions

export type Dispatch = (action: Actions) => void
