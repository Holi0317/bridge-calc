import { prevGamesSelector } from "./prev-games";
import { makePrevGamesTree } from "../../../test-fixtures/prev-games-state";

test("it should select empty array for empty prev games", () => {
  const tree = makePrevGamesTree([]);
  const expected = [];
  const actual = prevGamesSelector(tree);
  expect(actual).toEqual(expected);
});

test("it should select content of prev games in state tree", () => {
  const tree = makePrevGamesTree(["a", "b", "c"]);
  const expected = ["a", "b", "c"];
  const actual = prevGamesSelector(tree);
  expect(actual).toEqual(expected);
});
