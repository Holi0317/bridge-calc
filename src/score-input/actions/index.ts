import {IBidAction} from './bid'
import {IChangePlayersAction} from './change-players'
import {ISetBidAction} from './set-bid'
import {ISetWinAction} from './set-win'
import {ISkipAction} from './skip'
import {IStartAction} from './start'
import {IUndoAction} from './undo'
import {IWinAction} from './win'
import {IReplaceCurrentGameAction} from './replace-current-game'

export type CurrentGameActions =
  | IBidAction
  | IChangePlayersAction
  | ISetBidAction
  | ISetWinAction
  | ISkipAction
  | IStartAction
  | IUndoAction
  | IWinAction
  | IReplaceCurrentGameAction
