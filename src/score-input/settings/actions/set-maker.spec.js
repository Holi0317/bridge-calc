import { ActionTypes } from "../../../action-types";
import { setMakerAction } from "./set-maker";

test("it should return set maker action", () => {
  const expected = {
    type: ActionTypes.SET_MAKER,
    maker: "001"
  };
  const actual = setMakerAction("001");
  expect(actual).toEqual(expected);
});
