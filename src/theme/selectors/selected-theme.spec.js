import { selectedThemeSelector } from "./selected-theme";

test("it should select correct attribute", () => {
  const state = {
    theme: {
      theme: "default"
    }
  };
  const expected = "default";
  const actual = selectedThemeSelector(state);
  expect(actual).toEqual(expected);
});
