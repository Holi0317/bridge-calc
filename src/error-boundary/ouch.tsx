import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

import { Typography, Link } from "@material-ui/core";

function reload() {
  window.location.reload();
}

interface OuchProps {
  error: Error;
}

const Container = styled.div`
  height: 100%;
  margin: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  text-align: center;
`;

const SadFace = styled.div`
  color: ${props => props.theme.palette.text.primary};
  font-weight: 700;
  font-size: 72px;
  padding-bottom: 1em;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.palette.text.primary};
  font-weight: 200;
  font-size: 12px;
`;

export function Ouch({ error }: OuchProps) {
  const { t } = useTranslation();

  return (
    <Container>
      <SadFace>:-(</SadFace>
      <Typography variant="body1">
        {t("Ouch! An error has occurred.")}
      </Typography>
      <Link href="#" variant="body2" onClick={reload}>
        {t("Hopefully your data is safe. Refresh page may fix the problem.")}
      </Link>
      <ErrorMessage>
        {t("Error message: {{message}}", { message: error.message })}
      </ErrorMessage>
    </Container>
  );
}
