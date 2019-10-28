import * as React from "react";
import { bindActionCreators } from "redux";
import flowRight from "lodash-es/flowRight";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { Dropdown } from "../../../material/dropdown";
import { namesSelector } from "../../selectors/names";
import { roundsSelector } from "../../selectors/rounds";
import { makerSelector } from "../selectors/maker";
import { namesChangedSelector } from "../selectors/names-changed";
import { makerSourceSelector } from "../selectors/maker-source";
import { changePlayersAction } from "../../actions/change-players";
import { initSettingsAction } from "../actions/init-settings";
import { setMakerAction } from "../actions/set-maker";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { RootState, Dispatch } from "../../../types";

const mapStateToProps = (state: RootState) => ({
  names: namesSelector(state),
  namesSource: makerSourceSelector(state),
  rounds: roundsSelector(state),
  maker: makerSelector(state),
  disabled: namesChangedSelector(state),
  currentGame: state.currentGame
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changePlayers: changePlayersAction,
      init: initSettingsAction,
      setMaker: setMakerAction,
      showToast: showToastAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type MakerEditorProps = stateType & dispatchType & WithTranslation;

export class MakerEditorImpl extends React.Component<MakerEditorProps> {
  public render() {
    const { maker, namesSource, disabled, setMaker, t } = this.props;

    return (
      <>
        <ExpansionPanelDetails>
          <Dropdown
            label={t("Maker")}
            disabled={disabled}
            source={disabled ? [] : namesSource}
            value={disabled ? "" : maker || ""}
            onChange={setMaker}
          />
        </ExpansionPanelDetails>

        <ExpansionPanelActions>
          <Button
            variant="contained"
            color="primary"
            disabled={disabled}
            onClick={this.commit}
          >
            {t("Change maker")}
          </Button>
        </ExpansionPanelActions>
      </>
    );
  }

  private commit = () => {
    const { names, rounds, maker, changePlayers, showToast, t } = this.props;
    changePlayers(names, maker!, rounds!);
    showToast(t("Maker changed!"));

    // Reset game settings in next tick
    window.setTimeout(() => {
      const { currentGame, init } = this.props;
      init(currentGame);
    }, 0);
  };
}

export const MakerEditor = flowRight(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MakerEditorImpl);
