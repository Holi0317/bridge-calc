import {CurrentGameActions} from './actions/current-game'
import {EntryActions} from './actions/ui/entry'
import {GameState} from './reducer/current-game'
import {IEntryState} from './reducer/ui/entry'
import {ISettingsState} from './reducer/ui/settings'
import {SettingsActions} from './actions/ui/settings'

export interface IPlayerMap<T> {[playerID: string]: T}

export type I18nT = (translate: string, opt?: any) => string

export interface IDropdownSource<T> {
  value: T,
  label: string,
  disabled?: boolean
}

export interface IRootState {
  currentGame: GameState,
  ui: {
    entry: IEntryState,
    settings: ISettingsState
  }
}

export type Actions =
  | CurrentGameActions
  | EntryActions
  | SettingsActions

export type Dispatch = (action: Actions) => void
