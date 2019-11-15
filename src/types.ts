import { Dispatch as ReduxDispatch } from "redux";
import { GameState } from "./score-input/reducer";
import { EntryState } from "./entry/entry-reducer";
import { SettingsState } from "./score-input/settings/reducer";
import { PrevGamesState } from "./prev-games/prev-games-reducer";
import { ToastSingletonState } from "./toast-singleton/toast-singleton-reducer";
import { ThemeState } from "./theme/theme-reducer";

import { CurrentGameActions } from "./score-input/actions";
import { PrevGamesActions } from "./prev-games/actions";

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

export type Actions = CurrentGameActions | PrevGamesActions;

export type Dispatch = ReduxDispatch<Actions>;
