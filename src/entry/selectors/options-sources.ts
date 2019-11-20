import { createSelector } from "reselect";
import { range } from "lodash-es";
import { createSource } from "../../utils";
import { RootState } from "../../types";
import { DropdownSource } from "../../material/dropdown";

// Rounds source to be used when there is no player available.
const defaultRounds = [{ value: 1, label: "1" }];

/**
 * Select Dropdown source for entry options.
 */
export const optionsSourcesSelector = createSelector(
  (state: RootState) => state.entry.playerNames.length,
  (state: RootState) => state.entry.rounds,
  (playerLength: number, selectedRounds: number): EntrySource => {
    const maxRounds = Math.floor(52 / playerLength);
    const rounds =
      playerLength > 0 ? createSource(range(1, maxRounds + 1)) : defaultRounds;
    const startingRound =
      playerLength > 0
        ? createSource(range(1, selectedRounds + 1))
        : defaultRounds;
    return {
      rounds,
      startingRound
    };
  }
);

export interface EntrySource {
  rounds: DropdownSource<number>[];
  startingRound: DropdownSource<number>[];
}
