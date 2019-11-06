import { currentGameSelector } from "./current-game";
import { waitingBidState } from "../../../test-fixtures/current-game-states";

test("Null should be selected from currentGame state", () => {
  const expected = null;
  const state = {
    currentGame: null
  };
  const actual = currentGameSelector(state);
  expect(actual).toEqual(expected);
});

test("Waiting win state should be selected", () => {
  const expected = { ...waitingBidState };
  const state = {
    currentGame: waitingBidState
  };
  const actual = currentGameSelector(state);
  expect(actual).toEqual(expected);
});
