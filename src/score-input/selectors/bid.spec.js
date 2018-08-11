import { bidSelector, strBidSelector } from "./bid";
import {
  genMap,
  waitingWinState
} from "../../../test-fixtures/current-game-states";

test("Empty object should be selected for null state", () => {
  const expected = {};
  const state = {
    currentGame: null
  };
  const actual = bidSelector(state);
  expect(actual).toEqual(expected);
});

test("Bid object should be selected", () => {
  const expected = genMap(0, 1, 0, 1);
  const state = {
    currentGame: {
      ...waitingWinState,
      bid: genMap(0, 1, 0, 1)
    }
  };
  const actual = bidSelector(state);
  expect(actual).toEqual(expected);
});

test("Empty object should be selected for null state in string selector", () => {
  const expected = {};
  const state = {
    currentGame: null
  };
  const actual = strBidSelector(state);
  expect(actual).toEqual(expected);
});

test("Bid object in string form should be selected in string selector", () => {
  const expected = genMap("0", "1", "0", "1");
  const state = {
    currentGame: {
      ...waitingWinState,
      bid: genMap(0, 1, 0, 1)
    }
  };
  const actual = strBidSelector(state);
  expect(actual).toEqual(expected);
});
