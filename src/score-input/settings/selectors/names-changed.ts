import { createSelector } from "reselect";
import { namesSelector as settingsNamesSelector } from "./names";
import { namesSelector } from "../../selectors/names";
import { PlayerMap } from "../../../types";

/**
 * Determine if settings name list has changed by doing an identity comparison (read: ===)
 */
export const namesChangedSelector = createSelector(
  settingsNamesSelector,
  namesSelector,
  (settingsName: PlayerMap<string>, names: PlayerMap<string>): boolean =>
    settingsName !== names
);
