import {IBidAction} from './bid'
import {IChangePlayersAction} from './change-players'
import {ISetBidAction} from './set-bid'
import {ISetWinAction} from './set-win'
import {ISkipAction} from './skip'
import {IStartAction} from './start'
import {IUndoAction} from './undo'
import {IWinAction} from './win'

export type CurrentGameActions =
  | IBidAction
  | IChangePlayersAction
  | ISetBidAction
  | ISetWinAction
  | ISkipAction
  | IStartAction
  | IUndoAction
  | IWinAction
