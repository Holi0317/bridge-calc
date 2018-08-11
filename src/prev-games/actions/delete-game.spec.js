import { deleteGameAction } from "./delete-game";
import { ActionTypes } from "../../action-types";

test("it should return delete game action", () => {
  const expected = {
    type: ActionTypes.DELETE_GAME,
    index: 3
  };
  const actual = deleteGameAction(3);
  expect(actual).toEqual(expected);
});
