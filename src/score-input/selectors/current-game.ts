import { RootState } from "../../types";
import { GameState } from "../reducer/types";

export function currentGameSelector(state: RootState): GameState {
  return state.currentGame;
}
