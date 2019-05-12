import { Dispatch as ReduxDispatch } from "redux";
import { CurrentGameActions } from "./score-input/actions";
import { EntryActions } from "./entry/actions";
import { GameState } from "./score-input/reducer";
import { IEntryState } from "./entry/entry-reducer";
import { ISettingsState } from "./score-input/settings/reducer";
import { GameSettingsActions } from "./score-input/settings/actions";
import { IPrevGamesState } from "./prev-games/prev-games-reducer";
import { PrevGamesActions } from "./prev-games/actions";
import { IToastSingletonState } from "./toast-singleton/toast-singleton-reducer";
import { IThemeState } from "./theme/theme-reducer";

export interface IPlayerMap<T> {
  [playerID: string]: T;
}

export interface IRootState {
  currentGame: GameState;
  entry: IEntryState;
  gameSettings: ISettingsState;
  prevGames: IPrevGamesState;
  toastSingleton: IToastSingletonState;
  theme: IThemeState;
}

export type Actions =
  | CurrentGameActions
  | EntryActions
  | GameSettingsActions
  | PrevGamesActions;

export type Dispatch = ReduxDispatch<Actions>;
