import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ActionHelp from "@material-ui/icons/Help";
import NavigationArrowBack from "@material-ui/icons/ArrowBack";
import { Titles } from "./titles";
import classes from "./navbar.pcss";

type NavbarProps = RouteComponentProps<any>;

export function NavbarImpl({ history, location }: NavbarProps) {
  const { t } = useTranslation();
  const hasBackBtn = location.pathname !== "/";

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {hasBackBtn && (
          <Tooltip title={t("Back to menu")}>
            <IconButton
              className={classes.backBtn}
              onClick={() => history.push("/")}
            >
              <NavigationArrowBack width="24px" height="24px" />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="h6" color="inherit" className={classes.title}>
          <Titles />
        </Typography>

        <Tooltip title={t("Help")}>
          <IconButton
            rel="noopener"
            target="_blank"
            href="https://gitlab.com/holi0317/bridge-calc/wikis/home"
          >
            <ActionHelp width="24px" height="24px" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export const Navbar = withRouter(NavbarImpl);
