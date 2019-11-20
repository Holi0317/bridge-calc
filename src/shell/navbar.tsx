import React from "react";
import { useHistory, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Help, ArrowBack } from "@material-ui/icons";
import styled from "styled-components/macro";
import { Titles } from "./titles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip
} from "@material-ui/core";

const StyledToolbar = styled(Toolbar)`
  flex-grow: 1;
`;

const BackIconBtn = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`;

const TitleContainer = styled(Typography)`
  flex-grow: 1;
`;

export function Navbar() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const hasBackBtn = location.pathname !== "/";

  return (
    <AppBar position="static">
      <StyledToolbar>
        {hasBackBtn && (
          <Tooltip title={t("Back to menu")}>
            <BackIconBtn onClick={() => history.push("/")}>
              <ArrowBack width="24px" height="24px" />
            </BackIconBtn>
          </Tooltip>
        )}

        <TitleContainer variant="h6" color="inherit">
          <Titles />
        </TitleContainer>

        <Tooltip title={t("Help")}>
          <IconButton
            rel="noopener"
            target="_blank"
            href="https://gitlab.com/holi0317/bridge-calc/wikis/home"
          >
            <Help width="24px" height="24px" />
          </IconButton>
        </Tooltip>
      </StyledToolbar>
    </AppBar>
  );
}
