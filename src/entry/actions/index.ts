import {IAddPlayerAction} from './add-player'
import {IResetAction} from './reset'
import {IToggleOptionOptionAction} from './toggle-option-open'
import {ISetEntryPropsAction} from './set-entry-props'

export type EntryActions =
  | IAddPlayerAction
  | IResetAction
  | IToggleOptionOptionAction
  | ISetEntryPropsAction
