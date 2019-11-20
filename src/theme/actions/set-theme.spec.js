import { ActionTypes } from "../../action-types";
import { setThemeAction } from "./set-theme";

test("it should return set theme action", () => {
  const expected = {
    type: ActionTypes.SET_THEME,
    payload: "default"
  };
  const actual = setThemeAction("default");
  expect(actual).toEqual(expected);
});
