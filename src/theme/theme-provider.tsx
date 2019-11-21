import React from "react";
import { useSelector } from "react-redux";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider
} from "@material-ui/core/styles";
import { ThemeProvider as SSThemeProvider } from "styled-components";
import { activatedThemeSelector } from "./selectors/activated-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSelector(activatedThemeSelector);

  return (
    <StylesProvider injectFirst>
      <SSThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </SSThemeProvider>
    </StylesProvider>
  );
}
