import { stageSelector } from "./stage";
import { GameStage } from "../game-stage";
import { waitingBidState } from "../../../test-fixtures/current-game-states";

test("null should be selected when currentGame is null", () => {
  const expected = null;
  const state = {
    currentGame: null
  };
  const actual = stageSelector(state);
  expect(actual).toBe(expected);
});

test("stage should be selected when there is currentGame", () => {
  const expected = GameStage.waitingBid;
  const state = {
    currentGame: {
      ...waitingBidState
    }
  };
  const actual = stageSelector(state);
  expect(actual).toBe(expected);
});
