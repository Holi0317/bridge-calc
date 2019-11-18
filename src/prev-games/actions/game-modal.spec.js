import { ActionTypes } from "../../action-types";
import { closeGameModalAction, showGameModalAction } from "./game-modal";

test("show modal action should be created", () => {
  const expected = {
    type: ActionTypes.SET_GAME_MODAL,
    payload: 5
  };
  const actual = showGameModalAction(5);
  expect(actual).toEqual(expected);
});

test("close modal action should be created", () => {
  const expected = {
    type: ActionTypes.SET_GAME_MODAL,
    payload: null
  };
  const actual = closeGameModalAction();
  expect(actual).toEqual(expected);
});
