import { resetGamesAtion } from "./reset-games";
import { ActionTypes } from "../../action-types";

test("it should return reset games action", () => {
  const expected = {
    type: ActionTypes.RESET_GAMES
  };
  const actual = resetGamesAtion();
  expect(actual).toEqual(expected);
});
