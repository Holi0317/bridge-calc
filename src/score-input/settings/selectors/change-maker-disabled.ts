import { namesChangedSelector } from "./names-changed";
import { IRootState } from "../../../types";

/**
 * Select if change maker panel should be disabled or not.
 */
export function changeMakerDisabledSelector(state: IRootState) {
  return namesChangedSelector(state);
}
