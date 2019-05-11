import * as React from "react";
import { connect } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { activatedThemeSelector } from "./selectors/activated-theme";
import { cssPropsSelector } from "./selectors/css-props";
import { IRootState } from "../types";

const mapStateToProps = (state: IRootState) => ({
  theme: activatedThemeSelector(state),
  cssProps: cssPropsSelector(state)
});

type stateType = ReturnType<typeof mapStateToProps>;

type ThemeProviderProps = stateType & { children: React.ReactNode };

export function ThemeProviderImpl({
  theme,
  cssProps,
  children
}: ThemeProviderProps) {
  cssProps.forEach((value, key) => {
    document.body.style.setProperty(key, value);
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export const ThemeProvider = connect(mapStateToProps)(ThemeProviderImpl);
