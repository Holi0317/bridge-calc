import * as lolex from "lolex";
import { migrateOldState } from "./converter";
import { GameStage } from "../score-input/game-stage";

let clock = null;
beforeEach(() => {
  clock = lolex.install();
});
afterEach(() => {
  if (clock) {
    clock.uninstall();
  }
});

test("it should convert bid stage to waiting bid", () => {
  const data = {
    players: [
      {
        bid: null,
        win: null,
        _buffer: {
          lastRound: null,
          combo: null,
          miss: null,
          maxCombo: null,
          sum: null
        },
        score: [],
        name: "Rachel"
      },
      {
        bid: null,
        win: null,
        _buffer: {
          lastRound: null,
          combo: null,
          miss: null,
          maxCombo: null,
          sum: null
        },
        score: [],
        name: "Ruth"
      },
      {
        bid: null,
        win: null,
        _buffer: {
          lastRound: null,
          combo: null,
          miss: null,
          maxCombo: null,
          sum: null
        },
        score: [],
        name: "Helen"
      },
      {
        bid: null,
        win: null,
        _buffer: {
          lastRound: null,
          combo: null,
          miss: null,
          maxCombo: null,
          sum: null
        },
        score: [],
        name: "Walter"
      },
      {
        bid: null,
        win: null,
        _buffer: {
          lastRound: null,
          combo: null,
          miss: null,
          maxCombo: null,
          sum: null
        },
        score: [],
        name: "Patience"
      }
    ],
    maker: 0,
    currentRound: 1,
    state: 1,
    totalRounds: 6
  };
  const actual = migrateOldState(data);
  expect(actual.stage).toEqual(GameStage.waitingBid);
  expect(actual).toMatchSnapshot();
});

test("it should convert input win stage to waiting win", () => {
  const data = {
    players: [
      {
        bid: "1",
        win: null,
        _buffer: { lastRound: 0, combo: 0, miss: 0, maxCombo: 0, sum: 0 },
        score: [],
        name: "Frances"
      },
      {
        bid: "1",
        win: null,
        _buffer: { lastRound: 0, combo: 0, miss: 0, maxCombo: 0, sum: 0 },
        score: [],
        name: "John"
      },
      {
        bid: "0",
        win: null,
        _buffer: { lastRound: 0, combo: 0, miss: 0, maxCombo: 0, sum: 0 },
        score: [],
        name: "Patience"
      },
      {
        bid: "0",
        win: null,
        _buffer: { lastRound: 0, combo: 0, miss: 0, maxCombo: 0, sum: 0 },
        score: [],
        name: "Stephen"
      }
    ],
    maker: 0,
    currentRound: 1,
    state: 2,
    totalRounds: 13
  };
  const actual = migrateOldState(data);
  expect(actual.stage).toEqual(GameStage.waitingWin);
  expect(actual).toMatchSnapshot();
});

test("it should convert waiting stage to next round", () => {
  const data = {
    currentRound: 4,
    maker: 3,
    players: [
      {
        bid: "4",
        win: "3",
        _buffer: { lastRound: 3, combo: 0, miss: 2, maxCombo: 1, sum: 6 },
        score: [11, -1, -4, -1],
        name: "Christopher"
      },
      {
        bid: "2",
        win: "1",
        _buffer: { lastRound: 3, combo: 0, miss: 3, maxCombo: 0, sum: -6 },
        score: [-1, -1, -4, -1],
        name: "Rachel"
      },
      {
        bid: "0",
        win: "0",
        _buffer: { lastRound: 3, combo: 0, miss: 2, maxCombo: 1, sum: 5 },
        score: [10, -1, -4, 10],
        name: "Mark"
      },
      {
        bid: "0",
        win: "0",
        _buffer: { lastRound: 3, combo: 0, miss: 1, maxCombo: 2, sum: 11 },
        score: [10, 10, -9, 10],
        name: "Christopher"
      }
    ],
    state: 3,
    totalRounds: 13
  };
  const actual = migrateOldState(data);
  expect(actual.stage).toEqual(GameStage.waitingBid);
  expect(actual.currentRound).toEqual(5);
  expect(actual).toMatchSnapshot();
});

test("it should end game if waiting stage on last round", () => {
  const data = {
    players: [
      {
        bid: "2",
        win: "6",
        _buffer: { lastRound: 5, combo: 1, miss: 1, maxCombo: 3, sum: 62 },
        score: [11, 14, 19, -1, 19, -16],
        name: "Rachel"
      },
      {
        bid: "3",
        win: "0",
        _buffer: { lastRound: 5, combo: 2, miss: 3, maxCombo: 0, sum: 19 },
        score: [-1, -4, -4, 14, 14, -9],
        name: "Ruth"
      },
      {
        bid: "2",
        win: "0",
        _buffer: { lastRound: 5, combo: 0, miss: 2, maxCombo: 2, sum: 25 },
        score: [10, -4, 10, 10, -1, -4],
        name: "Helen"
      },
      {
        bid: "0",
        win: "0",
        _buffer: { lastRound: 5, combo: 3, miss: 1, maxCombo: 1, sum: 36 },
        score: [10, -4, 10, 10, 10, 10],
        name: "Walter"
      },
      {
        bid: "0",
        win: "0",
        _buffer: { lastRound: 5, combo: 3, miss: 1, maxCombo: 1, sum: 36 },
        score: [10, -4, 10, 10, 10, 10],
        name: "Patience"
      }
    ],
    maker: 0,
    currentRound: 6,
    state: 3,
    totalRounds: 6
  };
  const actual = migrateOldState(data);
  expect(actual.stage).toEqual(GameStage.ended);
  expect(actual).toMatchSnapshot();
});

test("it should convert round 5", () => {
  const data = {
    players: [
      {
        bid: "3",
        win: null,
        _buffer: { lastRound: 4, combo: 0, miss: 1, maxCombo: 3, sum: 43 },
        score: [11, 14, 19, -1],
        name: "Rachel"
      },
      {
        bid: "2",
        win: null,
        _buffer: { lastRound: 4, combo: 1, miss: 3, maxCombo: 0, sum: 5 },
        score: [-1, -4, -4, 14],
        name: "Ruth"
      },
      {
        bid: "1",
        win: null,
        _buffer: { lastRound: 4, combo: 2, miss: 1, maxCombo: 1, sum: 26 },
        score: [10, -4, 10, 10],
        name: "Helen"
      },
      {
        bid: "0",
        win: null,
        _buffer: { lastRound: 4, combo: 2, miss: 1, maxCombo: 1, sum: 26 },
        score: [10, -4, 10, 10],
        name: "Walter"
      },
      {
        bid: "0",
        win: null,
        _buffer: { lastRound: 4, combo: 2, miss: 1, maxCombo: 1, sum: 26 },
        score: [10, -4, 10, 10],
        name: "Patience"
      }
    ],
    maker: 4,
    currentRound: 5,
    state: 2,
    totalRounds: 6
  };
  const actual = migrateOldState(data);
  expect(actual.currentRound).toEqual(5);
  expect(actual.stage).toEqual(GameStage.waitingWin);
  expect(actual).toMatchSnapshot();
});

test("it should convert ended stage", () => {
  const data = {
    currentRound: null,
    maker: null,
    players: [
      {
        bid: null,
        win: null,
        _buffer: { lastRound: 2, combo: 2, miss: 0, maxCombo: 0, sum: 25 },
        score: [11, 14],
        name: "Christopher"
      },
      {
        bid: null,
        win: null,
        _buffer: { lastRound: 2, combo: 0, miss: 2, maxCombo: 0, sum: -2 },
        score: [-1, -1],
        name: "Rachel"
      },
      {
        bid: null,
        win: null,
        _buffer: { lastRound: 2, combo: 1, miss: 1, maxCombo: 0, sum: 9 },
        score: [-1, 10],
        name: "Mark"
      },
      {
        bid: null,
        win: null,
        _buffer: { lastRound: 2, combo: 1, miss: 1, maxCombo: 0, sum: 9 },
        score: [-1, 10],
        name: "Christopher"
      }
    ],
    state: 4,
    totalRounds: 2
  };
  const actual = migrateOldState(data);
  expect(actual.stage).toEqual(GameStage.ended);
  expect(actual).toMatchSnapshot();
});

test("it should throw error for notStarted state", () => {
  const data = {
    players: [],
    maker: null,
    currentRound: null,
    state: 0,
    totalRounds: 0
  };
  expect(() => {
    migrateOldState(data);
  }).toThrowError(TypeError);
});
