import { BidAction } from "./bid";
import { ChangePlayersAction } from "./change-players";
import { SetBidAction } from "./set-bid";
import { SetWinAction } from "./set-win";
import { SkipAction } from "./skip";
import { StartAction } from "./start";
import { UndoAction } from "./undo";
import { WinAction } from "./win";
import { ReplaceCurrentGameAction } from "./replace-current-game";

export type CurrentGameActions =
  | BidAction
  | ChangePlayersAction
  | SetBidAction
  | SetWinAction
  | SkipAction
  | StartAction
  | UndoAction
  | WinAction
  | ReplaceCurrentGameAction;
