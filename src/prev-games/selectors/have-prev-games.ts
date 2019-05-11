import { createSelector } from "reselect";
import { prevGamesSelector } from "./prev-games";
import { PrevGameEntry } from "../types";

export const havePrevGamesSelector = createSelector(
  prevGamesSelector,
  (prevGames: PrevGameEntry[]) => prevGames.length !== 0
);
