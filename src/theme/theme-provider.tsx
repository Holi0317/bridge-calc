import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { ThemeProvider as SSThemeProvider } from "styled-components/macro";
import { activatedThemeSelector } from "./selectors/activated-theme";
import { cssPropsSelector } from "./selectors/css-props";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSelector(activatedThemeSelector);
  const cssProps = useSelector(cssPropsSelector);

  useEffect(() => {
    cssProps.forEach((value, key) => {
      document.body.style.setProperty(key, value);
    });
  }, [cssProps]);

  return (
    <StylesProvider injectFirst>
      <SSThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </SSThemeProvider>
    </StylesProvider>
  );
}
