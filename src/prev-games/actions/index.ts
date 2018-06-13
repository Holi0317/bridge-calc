import {IAddGameAction} from './add-game'
import {IResetGamesAction} from './reset-games'
import {IDeleteGameAction} from './delete-game'
import {ISaveGameAction} from './save-game'
import {ISetGameModalAction} from './game-modal'

export type PrevGamesActions =
  | IAddGameAction
  | IDeleteGameAction
  | IResetGamesAction
  | ISaveGameAction
  | ISetGameModalAction
