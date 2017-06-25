// @flow
import type {CurrentGameActions} from './actions/current-game'
import type {EntryActions} from './actions/ui/entry'
import type {GameState} from './reducer/current-game'
import type {EntryState} from './reducer/ui/entry'
import type {SettingsState} from './reducer/ui/settings'
import type {SettingsActions} from './actions/ui/settings'

export type PlayerMap<T> = {[playerID: string]: T}

export type T = (translate: string, opt: ?any) => string

export type DropdownSource<T> = {
  value: T,
  label: string,
  disabled?: boolean
}

export type RootState = {
  currentGame: GameState,
  ui: {
    entry: EntryState,
    settings: SettingsState
  }
}

export type Actions =
  | CurrentGameActions
  | EntryActions
  | SettingsActions

export type Dispatch = (action: Actions) => void
