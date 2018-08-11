import { themeReducer as reducer } from "./theme-reducer";
import { setThemeAction } from "./actions/set-theme";
import { toggleDarkAction } from "./actions/toggle-dark";

const defaultState = {
  theme: "Pink",
  dark: false
};

test("default state", () => {
  const state = undefined;
  const action = {
    type: "#NULL"
  };
  const expected = defaultState;
  const actual = reducer(state, action);
  expect(actual).toEqual(expected);
});

test("setThemeAction should work", () => {
  const state = defaultState;
  const action = setThemeAction("Indigo");
  const expected = {
    ...defaultState,
    theme: "Indigo"
  };
  const actual = reducer(state, action);
  expect(actual).toEqual(expected);
});

test("toggleDark should work", () => {
  const state = {
    ...defaultState,
    dark: true
  };
  const action = toggleDarkAction();
  const expected = {
    ...defaultState,
    dark: false
  };
  const actual = reducer(state, action);
  expect(actual).toEqual(expected);
});
