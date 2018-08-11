import { skip } from "./skip";
import {
  waitingBidState,
  waitingWinState
} from "../../../test-fixtures/current-game-states";
import { GameStage } from "../game-stage";

// Just being lazy
const time = new Date(1);

test("it should do no-op when n=0", () => {
  const state = {
    ...waitingBidState
  };
  const n = 0;
  const expected = {
    ...waitingBidState
  };
  const actual = skip(state, n, time);
  expect(actual).toEqual(expected);
});

test("it should do no-op when n is negative", () => {
  const state = {
    ...waitingBidState
  };
  const n = -5;
  const expected = {
    ...waitingBidState
  };
  const actual = skip(state, n, time);
  expect(actual).toEqual(expected);
});

test("it should convert state to waitingBid after skipping", () => {
  const state = {
    ...waitingWinState
  };
  const n = 0;
  const expected = {
    ...waitingBidState
  };
  const actual = skip(state, n, time);
  expect(actual).toEqual(expected);
});

test("it should skip multiple rounds", () => {
  const state = {
    ...waitingBidState
  };
  const n = 5;
  const actual = skip(state, n, time);
  expect(actual.currentRound).toEqual(6);
  expect(actual).toMatchSnapshot();
});

test("it should end game when n is larger than remaining rounds", () => {
  const state = {
    ...waitingBidState
  };
  const n = 13;
  const actual = skip(state, n, time);
  expect(actual.stage).toEqual(GameStage.ended);
  expect(actual).toMatchSnapshot();
});

test("it should fill 0 for scores on skipped rounds", () => {
  const state = {
    ...waitingBidState
  };
  const n = 1;
  const actual = skip(state, n, time);
  expect(actual).toMatchSnapshot();
});

test("it should not end game when skipping on second last round", () => {
  const state = {
    ...waitingBidState,
    rounds: 2
  };
  const n = 1;
  const actual = skip(state, n, time);
  expect(actual.currentRound).toEqual(2);
  expect(actual).toMatchSnapshot();
});

test("it should end game when skipping on last round", () => {
  const state = {
    ...waitingBidState,
    rounds: 1
  };
  const n = 1;
  const actual = skip(state, n, time);
  expect(actual.stage).toEqual(GameStage.ended);
  expect(actual).toMatchSnapshot();
});

test("skip 0 rounds on last round should not end the game", () => {
  const state = {
    ...waitingBidState,
    rounds: 1
  };
  const n = 0;
  const actual = skip(state, n, time);
  expect(actual.stage).toEqual(GameStage.waitingBid);
  expect(actual).toMatchSnapshot();
});
