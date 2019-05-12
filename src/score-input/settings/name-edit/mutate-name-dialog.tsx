import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Dropdown } from "../../../material/dropdown";
import { makerSourceSelector } from "../selectors/maker-source";
import { namesSelector } from "../selectors/names";
import { expectedRoundsSelector } from "../selectors/expected-rounds";
import { changePlayersAction } from "../../actions/change-players";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { initSettingsAction } from "../actions/init-settings";
import { IRootState, Dispatch } from "../../../types";

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  names: namesSelector(state),
  rounds: expectedRoundsSelector(state),
  makers: makerSourceSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changePlayers: changePlayersAction,
      init: initSettingsAction,
      showToast: showToastAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

interface IMutateNameDialogProps {
  open: boolean;
  onRequestClose(): void;
}

interface IMutateNameDialogState {
  chosenMaker: string;
}

export class MutateNameDialogImpl extends React.Component {
  public props: IMutateNameDialogProps &
    stateType &
    dispatchType &
    WithTranslation;
  public state: IMutateNameDialogState = {
    chosenMaker: ""
  };

  public render() {
    const { makers, open, rounds, t } = this.props;
    const { chosenMaker } = this.state;

    return (
      <Dialog onClose={this.reject} open={open}>
        <DialogTitle>{t("Choose the maker for this round")}</DialogTitle>

        <DialogContent>
          <Dropdown
            label={t("Maker")}
            value={chosenMaker}
            source={makers}
            onChange={this.makerChanged}
          />
          <div>{t("Expected rounds: {{rounds}}", { rounds })}</div>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={this.reject}>
            {t("Cancel")}
          </Button>
          <Button
            disabled={chosenMaker === ""}
            color="primary"
            onClick={this.confirm}
          >
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private makerChanged = (ID: string) => {
    this.setState(() => ({
      chosenMaker: ID
    }));
  };

  private confirm = () => {
    const maker = this.state.chosenMaker;
    const { names, rounds, changePlayers } = this.props;
    changePlayers(names, maker, rounds);

    // Reset setting state after a tick
    window.setTimeout(() => {
      const { init, currentGame, showToast, onRequestClose, t } = this.props;
      init(currentGame);
      onRequestClose();
      showToast(t("Player name changed!"));
    }, 0);
  };

  private reject = () => {
    this.props.onRequestClose();
  };
}

export const MutateNameDialog = flowRight(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MutateNameDialogImpl) as React.ComponentType<IMutateNameDialogProps>;
