import { activatedThemeSelector } from "./activated-theme";
import { pinkTheme } from "../color-presets";
import { createMuiTheme } from "@material-ui/core/styles";

/**
 * Make partial of redux tree for consumption.
 *
 * @param {string} theme Name / ID of the theme selected
 * @param {boolean} dark Is current theme in dark variant or not
 * @returns {Object} partial redux tree
 */
function makeTree(theme, dark = false) {
  return {
    theme: {
      theme,
      dark
    }
  };
}

test("it should work on existing bright theme", () => {
  const state = makeTree("Indigo");
  const actual = activatedThemeSelector(state);
  expect(actual).toMatchSnapshot();
});

test("it should use dark theme correctly", () => {
  const state = makeTree("Pink", true);
  const actual = activatedThemeSelector(state);
  expect(actual).toMatchSnapshot();
});

test("it should return pink theme on non-existing theme", () => {
  const state = makeTree(
    Math.random()
      .toString(36)
      .substring(7)
  );
  const actual = activatedThemeSelector(state);
  const expected = createMuiTheme(pinkTheme);

  /*
   * Theme object contains function.
   * Stringify the result could remove function difference
   * and make test pass.
   */
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});
