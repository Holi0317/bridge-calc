import styled from "styled-components/macro";

export const Container = styled.div`
  flex: 1 1 100%;
  padding-left: 16px;
  padding-right: 16px;
  margin: 0 auto 100px;

  ${props => props.theme.breakpoints.up("sm")} {
    max-width: 750px;
  }

  ${props => props.theme.breakpoints.up("lg")} {
    max-width: 960px;
  }

  ${props => props.theme.breakpoints.up("xl")} {
    max-width: 1140px;
  }
`;
