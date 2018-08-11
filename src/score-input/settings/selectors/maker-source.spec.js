import { makerSourceSelector } from "./maker-source";
import { genMap } from "../../../../test-fixtures/current-game-states";
import { makeSettingsTree } from "../../../../test-fixtures/settings-state";

test("Empty array should be selected for empty names", () => {
  const state = makeSettingsTree();
  const expected = [];
  const actual = makerSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Array of dropdown source should be selected for normal names", () => {
  const state = makeSettingsTree({
    names: genMap("John", "Mary", "Henry", "Joe"),
    maker: "a"
  });
  const expected = [
    { value: "a", label: "John" },
    { value: "b", label: "Mary" },
    { value: "c", label: "Henry" },
    { value: "d", label: "Joe" }
  ];
  const actual = makerSourceSelector(state);
  expect(actual).toEqual(expected);
});
