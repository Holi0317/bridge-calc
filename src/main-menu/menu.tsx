import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  PlayArrow,
  FiberNew,
  SkipPrevious,
  SettingsRounded,
  Info,
  BugReport
} from "@material-ui/icons";
import { Container } from "../material/container";
import { Tile } from "./tile";
import { showContinueSelector } from "./show-continue-selector";

export function Menu() {
  const { t } = useTranslation();

  const showContinue = useSelector(showContinueSelector);

  return (
    <Container>
      {showContinue ? (
        <Grid>
          <Tile
            icon={<PlayArrow color="action" />}
            title={t("Continue")}
            to="/score-input"
          />
        </Grid>
      ) : null}

      <Grid container spacing={8}>
        <Grid item md={6} xs={12}>
          <Tile
            icon={<FiberNew color="action" />}
            title={t("New Game")}
            to="/entry"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Tile
            icon={<SkipPrevious color="action" />}
            title={t("Previous games")}
            to="/prev-games"
          />
        </Grid>
      </Grid>

      <Grid container spacing={8}>
        <Grid item md={4} xs={12}>
          <Tile
            icon={<SettingsRounded color="action" />}
            title={t("Settings")}
            to="/global-settings"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Tile
            icon={<Info color="action" />}
            title={t("Information")}
            to="https://gitlab.com/holi0317/bridge-calc/wikis/home"
            external={true}
            target="_blank"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Tile
            icon={<BugReport color="action" />}
            title={t("Support/bug")}
            to="https://gitlab.com/holi0317/bridge-calc/issues"
            external={true}
            target="_blank"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
