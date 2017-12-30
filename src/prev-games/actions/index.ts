import {IAddGameAction} from './add-game'
import {IResetGamesAction} from './reset-games'
import {IDeleteGameAction} from './delete-game'
import {ISaveGameAction} from './save-game'

export type PrevGamesActions =
  | IAddGameAction
  | IDeleteGameAction
  | IResetGamesAction
  | ISaveGameAction
