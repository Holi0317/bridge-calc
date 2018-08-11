import { nameEditDisabledSelector } from "./name-edit-disabled";
import { makeSettingsTree } from "../../../../test-fixtures/settings-state";

test("it should select makerDirty state", () => {
  const expected = true;
  const state = makeSettingsTree({
    makerDirty: true
  });
  const actual = nameEditDisabledSelector(state);
  expect(actual).toEqual(expected);
});
