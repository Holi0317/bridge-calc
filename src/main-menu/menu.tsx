import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Container } from "../material/container";
import AvPlayArrow from "@material-ui/icons/PlayArrow";
import AvFiberNew from "@material-ui/icons/FiberNew";
import AvSkipPrevious from "@material-ui/icons/SkipPrevious";
import ActionSettings from "@material-ui/icons/SettingsRounded";
import ActionInfo from "@material-ui/icons/Info";
import ActionBugReport from "@material-ui/icons/BugReport";
import { Tile } from "./tile";
import { showContinueSelector } from "./show-continue-selector";
import { RootState } from "../types";

const mapStateToProps = (state: RootState) => ({
  showContinue: showContinueSelector(state)
});

type stateType = ReturnType<typeof mapStateToProps>;

type MenuProps = stateType;

export function MenuImpl({ showContinue }: MenuProps) {
  const { t } = useTranslation();

  return (
    <Container>
      {showContinue ? (
        <Grid>
          <Tile
            icon={<AvPlayArrow color="action" />}
            title={t("Continue")}
            to="/score-input"
          />
        </Grid>
      ) : null}

      <Grid container spacing={8}>
        <Grid item md={6} xs={12}>
          <Tile
            icon={<AvFiberNew color="action" />}
            title={t("New Game")}
            to="/entry"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Tile
            icon={<AvSkipPrevious color="action" />}
            title={t("Previous games")}
            to="/prev-games"
          />
        </Grid>
      </Grid>

      <Grid container spacing={8}>
        <Grid item md={4} xs={12}>
          <Tile
            icon={<ActionSettings color="action" />}
            title={t("Settings")}
            to="/global-settings"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Tile
            icon={<ActionInfo color="action" />}
            title={t("Information")}
            to="https://gitlab.com/holi0317/bridge-calc/wikis/home"
            external={true}
            target="_blank"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Tile
            icon={<ActionBugReport color="action" />}
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

export const Menu = connect(mapStateToProps)(MenuImpl);
