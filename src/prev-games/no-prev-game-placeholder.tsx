import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { default as MaterialLink } from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import { JokerIcon } from "./joker-icon";

const Container = styled.div`
  height: 100%;
  margin-top: 1em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledJoker = styled(JokerIcon)`
  width: 8em;
  height: 8em;
  margin-bottom: 1em;
  fill: rgba(0, 0, 0, 0.66);
`;

const StartLink = styled(MaterialLink)`
  color: #428bca;
` as React.ComponentType<any>;

export function NoPrevGamePlaceholder() {
  const { t } = useTranslation();

  return (
    <Container>
      <StyledJoker />
      <Typography>{t("You have not played any game yet.")}</Typography>
      <StartLink component={RouterLink} to="/entry">
        {t("Click here to start a new game")}
      </StartLink>
    </Container>
  );
}
