import { createSelector } from "reselect";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { selectedThemeSelector } from "./selected-theme";
import { isDarkThemeSelector } from "./is-dark-theme";
import { themes, pinkTheme } from "../color-presets";

/**
 * Select currently activated theme.
 * If selected theme is not found, would resort to use pink theme
 */
export const activatedThemeSelector = createSelector(
  selectedThemeSelector,
  isDarkThemeSelector,
  (selectedTheme: string, dark: boolean): Theme => {
    const type = dark ? "dark" : "light";
    const options = themes.get(selectedTheme) || pinkTheme;

    return createMuiTheme({
      ...options,
      palette: {
        ...options.palette,
        type
      }
    });
  }
);
