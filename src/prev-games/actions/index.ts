import {IAddGameAction} from './add-game'
import {IResetGamesAction} from './reset-games'
import {IDeleteGameAction} from './delete-game'

export type PrevGamesActions =
  | IAddGameAction
  | IDeleteGameAction
  | IResetGamesAction
