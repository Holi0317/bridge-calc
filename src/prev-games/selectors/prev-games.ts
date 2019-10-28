import { RootState } from "../../types";
import { PrevGameEntry } from "../types";

/**
 * Select all game entries in the redux store.
 */
export function prevGamesSelector(state: RootState): PrevGameEntry[] {
  return state.prevGames.prevGames;
}
