import { makeSettingsTree } from "../../../../test-fixtures/settings-state";
import { PANEL } from "../panel";
import { expandedPanelSelector } from "./expanded-panel";

test("it should select currently expanded panel", () => {
  const state = makeSettingsTree({
    expandedPanel: PANEL.ROUND_MANAGEMENT
  });
  const expected = PANEL.ROUND_MANAGEMENT;
  const actual = expandedPanelSelector(state);
  expect(actual).toEqual(expected);
});
