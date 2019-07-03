import { currentRoundSelector } from "./current-round";
import {
  endedState,
  waitingBidState
} from "../../../test-fixtures/current-game-states";

test("0 should be selected if currentGame is null", () => {
  const expected = 0;
  const state = {
    currentGame: null
  };
  const actual = currentRoundSelector(state);
  expect(actual).toBe(expected);
});

test("0 should be selected if currentRound does not exist", () => {
  const expected = 0;
  const state = {
    currentGame: {
      ...endedState
    }
  };
  const actual = currentRoundSelector(state);
  expect(actual).toBe(expected);
});

test("currentRound should be selected", () => {
  const expected = 1;
  const state = {
    currentGame: {
      ...waitingBidState
    }
  };
  const actual = currentRoundSelector(state);
  expect(actual).toBe(expected);
});
