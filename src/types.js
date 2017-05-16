// @flow
import type {CurrentGameActions} from './actions/current-game'
import type {EntryActions} from './actions/ui/entry'
import type {GameState} from './reducer/current-game'
import type {EntryState} from './reducer/ui/entry'

export type PlayerMap<T> = {[playerID: string]: T}

export type T = (translate: string, opt: ?any) => string

export type DropdownSource<T> = {
  value: T,
  label: string
}

export type RootState = {
  currentGame: GameState,
  ui: {
    entry: EntryState
  }
}

export type Actions =
  | CurrentGameActions
  | EntryActions

export type Dispatch = (action: Actions) => void
