import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.palette.background.default}
  }
`;
