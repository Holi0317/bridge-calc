import { namesSelector } from "../../../../src/score-input/settings/selectors/names";
import { makeSettingsTree } from "../../../../test-fixtures/settings-state";

test("names property should be selected from ui/settings", () => {
  const state = makeSettingsTree();
  const expected = {};
  const actual = namesSelector(state);
  expect(actual).toEqual(expected);
});
