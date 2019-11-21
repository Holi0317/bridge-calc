import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Error as ErrorIcon } from "@material-ui/icons";
import { Link } from "@material-ui/core";

const Container = styled.div`
  height: 100%;
  margin-top: 1em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledIcon = styled(ErrorIcon)`
  width: 8em !important;
  height: 8em !important;
  margin-bottom: 1em !important;
  fill: ${props => props.theme.palette.text.primary} !important;
`;

const TextContainer = styled.div`
  font-size: 22px;
  color: ${props => props.theme.palette.text.primary};
`;

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Container>
      <StyledIcon />
      <TextContainer>{t("Page not found!")}</TextContainer>
      <Link component={RouterLink} to="/">
        {t("Click here to return to main menu")}
      </Link>
    </Container>
  );
}
