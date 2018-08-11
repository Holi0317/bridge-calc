import { winStackInputSourceSelector } from "./win-stack-input-source";
import {
  endedState,
  genMap,
  waitingBidState,
  waitingWinState
} from "../../../test-fixtures/current-game-states";

test("Source for null state should have no option", () => {
  const state = {
    currentGame: null
  };
  const expected = {};
  const actual = winStackInputSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Source for ended state should have 1 disabled option", () => {
  const state = {
    currentGame: {
      ...endedState
    }
  };
  const source = [{ value: 0, label: "0", disabled: true }];
  const expected = genMap(source, source, source, source);
  const actual = winStackInputSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Sources for 1st round", () => {
  const state = {
    currentGame: {
      ...waitingBidState
    }
  };
  const source = [{ value: 0, label: "0" }, { value: 1, label: "1" }];
  const expected = genMap(source, source, source, source);
  const actual = winStackInputSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Sources for 2nd round", () => {
  const state = {
    currentGame: {
      ...waitingBidState,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ["b", "c", "d", "a"],
      currentRound: 2
    }
  };
  const source = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" }
  ];
  const expected = genMap(source, source, source, source);
  const actual = winStackInputSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Win should be disabled if selections that will exceed win", () => {
  const state = {
    currentGame: {
      ...waitingWinState,
      bid: genMap(0, 1, 0, 1),
      win: genMap(1, 0, 0, 0)
    }
  };
  const source = [{ value: 0, label: "0" }, { value: 1, label: "1" }];
  const restWin = [
    { value: 0, label: "0" },
    { value: 1, label: "1", disabled: true }
  ];
  const expected = genMap(source, restWin, restWin, restWin);
  const actual = winStackInputSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Win should be disabled if the selection will exceed than win -- Second round", () => {
  const state = {
    currentGame: {
      ...waitingWinState,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ["b", "c", "d", "a"],
      currentRound: 2,
      bid: genMap(0, 1, 1, 1),
      win: genMap(1, 0, 0, 0)
    }
  };
  const source = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" }
  ];
  const restWin = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2", disabled: true }
  ];
  const expected = genMap(source, restWin, restWin, restWin);
  const actual = winStackInputSourceSelector(state);
  expect(actual).toEqual(expected);
});
