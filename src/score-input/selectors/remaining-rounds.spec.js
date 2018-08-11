import { remainingRoundsSelector } from "./remaining-rounds";
import {
  endedState,
  waitingWinState
} from "../../../test-fixtures/current-game-states";

test("it should produce 0 for null game", () => {
  const state = {
    currentGame: null
  };
  const expected = 0;
  const actual = remainingRoundsSelector(state);
  expect(actual).toEqual(expected);
});

test("it should produce 0 for ended game", () => {
  const state = {
    currentGame: endedState
  };
  const expected = 0;
  const actual = remainingRoundsSelector(state);
  expect(actual).toEqual(expected);
});

test("it should produce correct amount for normal game", () => {
  const state = {
    currentGame: waitingWinState
  };
  const expected = 13;
  const actual = remainingRoundsSelector(state);
  expect(actual).toEqual(expected);
});
