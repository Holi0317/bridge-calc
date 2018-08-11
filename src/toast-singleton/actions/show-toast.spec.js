import { ActionTypes } from "../../action-types";
import { showToastAction } from "./show-toast";

test("it should return open toast action", () => {
  const expected = {
    type: ActionTypes.SHOW_TOAST,
    message: "testing",
    autoHideDuration: 100
  };
  const actual = showToastAction("testing", 100);
  expect(actual).toEqual(expected);
});

test("for undefined auto hide duration, default is used", () => {
  const expected = {
    type: ActionTypes.SHOW_TOAST,
    message: "testing environment",
    autoHideDuration: 3000
  };
  const actual = showToastAction("testing environment");
  expect(actual).toEqual(expected);
});
