import { gameTitleSelector } from "./game-title";
import {
  endedState,
  waitingBidState
} from "../../../test-fixtures/current-game-states";
import { tData } from "../../utils/translate";

test("Fallback title should be computed for null current game state", () => {
  const expected = tData("Game over");
  const state = {
    currentGame: null
  };
  const actual = gameTitleSelector(state);
  expect(actual).toEqual(expected);
});

test("Ended game should have proper title", () => {
  const expected = tData("Game over");
  const state = {
    currentGame: {
      ...endedState
    }
  };
  const actual = gameTitleSelector(state);
  expect(actual).toEqual(expected);
});

test("Running state should have title consist of current round and max round", () => {
  const expected = tData("Round {{currentRound}} of {{rounds}}", {
    currentRound: 2,
    rounds: 5
  });
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 2,
      rounds: 5
    }
  };
  const actual = gameTitleSelector(state);
  expect(actual).toEqual(expected);
});
