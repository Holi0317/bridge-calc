import { ActionTypes } from "../../action-types";
import { closeToastAction } from "./close-toast";

test("it should return close toast action", () => {
  const expected = {
    type: ActionTypes.CLOSE_TOAST
  };
  const actual = closeToastAction();
  expect(actual).toEqual(expected);
});
