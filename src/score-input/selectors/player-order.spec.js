import { playerOrderSelector } from "./player-order";
import {
  endedState,
  waitingBidState
} from "../../../test-fixtures/current-game-states";

test("empty array should be selected for null state", () => {
  const expected = [];
  const state = {
    currentGame: null
  };
  const actual = playerOrderSelector(state);
  expect(actual).toEqual(expected);
});

test("empty array should be selected for ended state", () => {
  const expected = [];
  const state = {
    currentGame: {
      ...endedState
    }
  };
  const actual = playerOrderSelector(state);
  expect(actual).toEqual(expected);
});

test("player order should be selected", () => {
  const expected = ["a", "b", "c", "d"];
  const state = {
    currentGame: {
      ...waitingBidState
    }
  };
  const actual = playerOrderSelector(state);
  expect(actual).toEqual(expected);
});
