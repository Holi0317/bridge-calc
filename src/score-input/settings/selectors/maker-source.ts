import { createSelector } from "reselect";
import { namesSelector } from "./names";
import { PlayerMap } from "../../../types";
import { DropdownSource } from "../../../material/dropdown";

/**
 * Select dropdown source for selecting maker from settings view.
 */
export const makerSourceSelector = createSelector(
  namesSelector,
  (names: PlayerMap<string>): DropdownSource<string>[] =>
    Object.entries(names).map(([ID, name]) => ({
      value: ID,
      label: name
    }))
);
