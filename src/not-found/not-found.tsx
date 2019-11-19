import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import AlertError from "@material-ui/icons/Error";

const Container = styled.div`
  height: 100%;
  margin-top: 1em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledIcon = styled(AlertError)`
  width: 8em !important;
  height: 8em !important;
  margin-bottom: 1em !important;
  fill: ${props => props.theme.palette.text.primary} !important;
`;

const TextContainer = styled.div`
  font-size: 22px;
  color: ${props => props.theme.palette.text.primary};
`;

const StyledLink = styled(Link)`
  color: #428bca;
`;

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Container>
      <StyledIcon />
      <TextContainer>{t("Page not found!")}</TextContainer>
      <StyledLink to="/">{t("Click here to return to main menu")}</StyledLink>
    </Container>
  );
}
