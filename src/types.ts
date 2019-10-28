import { Dispatch as ReduxDispatch } from "redux";
import { CurrentGameActions } from "./score-input/actions";
import { EntryActions } from "./entry/actions";
import { GameState } from "./score-input/reducer";
import { EntryState } from "./entry/entry-reducer";
import { SettingsState } from "./score-input/settings/reducer";
import { GameSettingsActions } from "./score-input/settings/actions";
import { PrevGamesState } from "./prev-games/prev-games-reducer";
import { PrevGamesActions } from "./prev-games/actions";
import { ToastSingletonState } from "./toast-singleton/toast-singleton-reducer";
import { ThemeState } from "./theme/theme-reducer";
import { ToastSingletonActions } from "./toast-singleton/actions";

export interface PlayerMap<T> {
  [playerID: string]: T;
}

export interface RootState {
  currentGame: GameState;
  entry: EntryState;
  gameSettings: SettingsState;
  prevGames: PrevGamesState;
  toastSingleton: ToastSingletonState;
  theme: ThemeState;
}

export type Actions =
  | CurrentGameActions
  | EntryActions
  | GameSettingsActions
  | PrevGamesActions
  | ToastSingletonActions;

export type Dispatch = ReduxDispatch<Actions>;
