import React from "react";
import Loadable from "react-loadable";
import styled, { keyframes } from "styled-components";
import { Spinner } from "../material/spinner";
import { Ouch } from "../error-boundary/ouch";

const Show = keyframes`
  0%,
  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  animation: ${Show} 1s linear;
`;

export function Loading({ error, pastDelay }: Loadable.LoadingComponentProps) {
  if (error) {
    console.error(error);
    return <Ouch error={new Error("Failed to load route.")} />;
  }
  if (pastDelay) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  return null;
}
