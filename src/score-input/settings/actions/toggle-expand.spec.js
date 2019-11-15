import { ActionTypes } from "../../../action-types";
import { PANEL } from "../panel";
import { toggleExpandAction } from "./toggle-expand";

test("it should return correct action", () => {
  const expected = {
    type: ActionTypes.TOGGLE_SETTING_PANEL,
    payload: PANEL.CHANGE_MAKER
  };
  const actual = toggleExpandAction(PANEL.CHANGE_MAKER);
  expect(actual).toEqual(expected);
});
