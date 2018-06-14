import {IAddPlayerAction} from './add-player'
import {IResetAction} from './reset'
import {ISetEntryPropsAction} from './set-entry-props'

export type EntryActions =
  | IAddPlayerAction
  | IResetAction
  | ISetEntryPropsAction
