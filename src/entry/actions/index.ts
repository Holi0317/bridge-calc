import {IAddPlayerAction} from './add-player'
import {IResetAction} from './reset'
import {ISetPlayerNamesAction} from './set-player-names'
import {ISetRoundsAction} from './set-rounds'
import {ISetStartingRoundAction} from './set-starting-round'
import {IToggleOptionOptionAction} from './toggle-option-open'

export type EntryActions =
  | IAddPlayerAction
  | IResetAction
  | ISetPlayerNamesAction
  | ISetRoundsAction
  | ISetStartingRoundAction
  | IToggleOptionOptionAction
