import { computeScores } from "./compute-scores";
import { genMap } from "../../../test-fixtures/current-game-states";

test("it should compute score correctly for every player", () => {
  const bids = genMap(2, 0, 0, 1);
  const wins = genMap(0, 1, 2, 1);
  const scores = genMap([], [], [], []);
  const expected = genMap([-4], [-1], [-4], [11]);
  const actual = computeScores(bids, wins, scores);
  expect(actual).toEqual(expected);
});
