import { namesChangedSelector } from "./names-changed";
import { RootState } from "../../../types";

/**
 * Select if change maker panel should be disabled or not.
 */
export function changeMakerDisabledSelector(state: RootState) {
  return namesChangedSelector(state);
}
