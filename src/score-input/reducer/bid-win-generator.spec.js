import { bidWinGenerator } from "./bid-win-generator";
import { genMap } from "../../../test-fixtures/current-game-states";

test("it should generate empty object for empty array", () => {
  const options = [];
  const expected = {};
  const actual = bidWinGenerator(options);
  expect(actual).toEqual(expected);
});

test("it should map 0 to given ID", () => {
  const options = ["a", "b", "c", "d"];
  const expected = genMap(0, 0, 0, 0);
  const actual = bidWinGenerator(options);
  expect(actual).toEqual(expected);
});
