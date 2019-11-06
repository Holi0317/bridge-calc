import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { ScoreboardTable } from "../score-input/scoreboard/scoreboard-table";
import { EntryDetail } from "./entry-detail";
import { modalEntrySelector } from "./selectors/modal-entry";
import { deleteGameAction } from "./actions/delete-game";
import { closeGameModalAction } from "./actions/game-modal";
import { replaceCurrentGameAction } from "../score-input/actions/replace-current-game";
import { RootState } from "../types";
import classes from "./prev-games.pcss";
import { useAction } from "../hooks/use-action";

export function GameModal() {
  const { t } = useTranslation();
  const history = useHistory();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const entry = useSelector(modalEntrySelector);
  const index = useSelector((state: RootState) => state.prevGames.modalEntry);

  const close = useAction(closeGameModalAction);
  const replaceGame = useAction(replaceCurrentGameAction);
  const deleteGame = useAction(deleteGameAction);

  const del = useCallback(() => {
    if (index == null) {
      return;
    }

    close();
    deleteGame(index);
  }, [index, deleteGame, close]);

  const load = useCallback(() => {
    if (entry == null) {
      return;
    }

    replaceGame(entry);
    history.push("/score-input");
  }, [entry, replaceGame, history]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={entry != null}
      maxWidth="md"
      onClose={close}
      aria-labelledby="game-modal-title"
    >
      {fullScreen ? (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={close} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {t("Previous game details")}
            </Typography>
            <Button color="inherit" onClick={del}>
              <Typography variant="subtitle1" color="inherit">
                {t("Load")}
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle id="game-modal-title">
          {t("Previous game details")}
        </DialogTitle>
      )}

      {entry != null && (
        <DialogContent>
          <EntryDetail entry={entry} />
          <ScoreboardTable entry={entry} mini={false} />
        </DialogContent>
      )}

      {!fullScreen && (
        <DialogActions>
          <Button onClick={del} color="primary">
            {t("Delete")}
          </Button>
          <Button onClick={load} color="primary" autoFocus>
            {t("Load")}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
