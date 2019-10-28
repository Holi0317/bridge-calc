import { AddGameAction } from "./add-game";
import { ResetGamesAction } from "./reset-games";
import { DeleteGameAction } from "./delete-game";
import { SaveGameAction } from "./save-game";
import { SetGameModalAction } from "./game-modal";

export type PrevGamesActions =
  | AddGameAction
  | DeleteGameAction
  | ResetGamesAction
  | SaveGameAction
  | SetGameModalAction;
