import { computeData } from "./compute-data";
import {
  genMap,
  waitingBidState,
  endedState
} from "../../../test-fixtures/current-game-states";

describe("prevScores field", () => {
  test("First round should produce 0 score", () => {
    const expected = genMap(0, 0, 0, 0);
    const entry = waitingBidState;
    const actual = computeData(entry).prevScores;
    expect(actual).toEqual(expected);
  });

  test("Successful selection on second round", () => {
    const expected = genMap(-1, -1, 10, 10);
    const entry = {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ["c", "d", "a", "b"],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    };
    const actual = computeData(entry).prevScores;
    expect(actual).toEqual(expected);
  });
});

describe("names field", () => {
  test("Names should be selected", () => {
    const expected = genMap("John", "Mary", "Henry", "Joe");
    const entry = waitingBidState;
    const actual = computeData(entry).names;
    expect(actual).toEqual(expected);
  });
});

describe("prevScores field", () => {
  test("First round should produce 0 score", () => {
    const expected = genMap(0, 0, 0, 0);
    const entry = waitingBidState;
    const actual = computeData(entry).prevScores;
    expect(actual).toEqual(expected);
  });

  test("Successful selection on second round", () => {
    const expected = genMap(-1, -1, 10, 10);
    const entry = {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ["c", "d", "a", "b"],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    };
    const actual = computeData(entry).prevScores;
    expect(actual).toEqual(expected);
  });
});

describe("totalScores field", () => {
  test("1st round before start should have 0 score", () => {
    const expected = genMap(0, 0, 0, 0);
    const entry = waitingBidState;
    const actual = computeData(entry).totalScores;
    expect(actual).toEqual(expected);
  });

  test("3rd round should compute total score correctly", () => {
    const expected = genMap(9, -2, 20, 9);
    const entry = {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ["c", "d", "a", "b"],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    };
    const actual = computeData(entry).totalScores;
    expect(actual).toEqual(expected);
  });
});

describe("ranks field", () => {
  test("1st round should produce all 1st place", () => {
    const expected = genMap("1st 👑", "1st 👑", "1st 👑", "1st 👑");
    const entry = waitingBidState;
    const actual = computeData(entry).ranks;
    expect(actual).toEqual(expected);
  });

  test("3rd round should rank properly", () => {
    const expected = genMap("2nd 🥈", "4th 💩", "1st 👑", "2nd 🥈");
    const entry = {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ["c", "d", "a", "b"],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    };
    const actual = computeData(entry).ranks;
    expect(actual).toEqual(expected);
  });
});

describe("endedRounds field", () => {
  test("1st round should produce empty array", () => {
    const expected = [];
    const entry = waitingBidState;
    const actual = computeData(entry).endedRounds;
    expect(actual).toEqual(expected);
  });

  test("ended state should produce [1..13]", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const entry = endedState;
    const actual = computeData(entry).endedRounds;
    expect(actual).toEqual(expected);
  });

  test("2nd running round should produce [1]", () => {
    const expected = [1];
    const entry = {
      ...waitingBidState,
      currentRound: 2,
      currentPlayerOrder: ["b", "c", "d", "a"],
      scores: genMap([0], [0], [0], [0])
    };
    const actual = computeData(entry).endedRounds;
    expect(actual).toEqual(expected);
  });
});
