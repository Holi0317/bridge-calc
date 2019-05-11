import { createSelector } from "reselect";
import { prevGamesSelector } from "./prev-games";
import { IRootState } from "../../types";
import { PrevGameEntry } from "../types";

export const modalEntrySelector = createSelector(
  prevGamesSelector,
  (state: IRootState) => state.prevGames.modalEntry,
  (
    prevGames: PrevGameEntry[],
    modalEntry: number | null
  ): PrevGameEntry | null => {
    if (modalEntry == null) {
      return null;
    }
    return prevGames[modalEntry] || null;
  }
);
