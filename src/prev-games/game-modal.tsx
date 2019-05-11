import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { RouteComponentProps, withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import withMobileDialog from "@material-ui/core/withMobileDialog";
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
import { Dispatch, IRootState, ITranslateMixin } from "../types";
import classes from "./prev-games.pcss";

const mapStateToProps = (state: IRootState) => ({
  entry: modalEntrySelector(state),
  index: state.prevGames.modalEntry
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      close: closeGameModalAction,
      load: replaceCurrentGameAction,
      del: deleteGameAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

export class GameModalImpl extends React.Component {
  public props: stateType &
    dispatchType & { fullScreen: boolean } & ITranslateMixin &
    RouteComponentProps<any>;

  public render() {
    const { entry, fullScreen, close, t } = this.props;

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
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {t("Previous game details")}
              </Typography>
              <Button color="inherit" onClick={this.del}>
                <Typography variant="subheading" color="inherit">
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
            <Button onClick={this.del} color="primary">
              {t("Delete")}
            </Button>
            <Button onClick={this.load} color="primary" autoFocus>
              {t("Load")}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }

  private del = () => {
    const { index, del, close } = this.props;
    if (index != null) {
      close();
      del(index);
    }
  };

  private load = () => {
    const { entry, load, history } = this.props;
    if (entry != null) {
      load(entry);
      history.push("/score-input");
    }
  };
}

export const GameModal = flowRight(
  translate(),
  withRouter,
  withMobileDialog(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GameModalImpl);
