import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { Typography } from "@material-ui/core";

const Container = styled.div`
  padding-top: 0.5em;
`;

const StyledLink = styled.a`
  color: ${props => props.theme.palette.primary.light};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function VersionDisplay() {
  const { t } = useTranslation();

  const version = `${VERSION}-${HASH}`;

  return (
    <Container>
      <Typography variant="caption">
        {t("Version: {{version}}", { version })}
      </Typography>
      <Typography variant="body1">
        <StyledLink
          href="https://gitlab.com/holi0317/bridge-calc/tags"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("See Changelog")}
        </StyledLink>
      </Typography>
    </Container>
  );
}
