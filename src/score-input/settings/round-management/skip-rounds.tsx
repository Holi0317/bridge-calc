import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import { skipAction } from "../../actions/skip";
import { initSettingsAction } from "../actions/init-settings";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { remainingRoundsSelector } from "../../selectors/remaining-rounds";
import { currentRoundSelector } from "../../selectors/current-round";
import { RootState, Dispatch } from "../../../types";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import classes from "../settings.pcss";

const mapStateToProps = (state: RootState) => ({
  currentGame: state.currentGame,
  currentRound: currentRoundSelector(state),
  remainingRounds: remainingRoundsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      skip: skipAction,
      init: initSettingsAction,
      showToast: showToastAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type SkipRoundsProps = stateType & dispatchType & WithTranslation;

export class SkipRoundsImpl extends React.Component<SkipRoundsProps> {
  public render() {
    const { remainingRounds, t } = this.props;
    return (
      <ExpansionPanelDetails>
        <Button
          variant="outlined"
          className={classes.skipRoundsBtn}
          onClick={this.skip(1)}
        >
          {t("Skip this round")}
        </Button>
        <Button
          variant="outlined"
          className={classes.skipRoundsBtn}
          disabled={remainingRounds <= 1}
          onClick={this.skip(remainingRounds - 1)}
        >
          {t("Skip to last round")}
        </Button>
        <Button
          variant="outlined"
          className={classes.skipRoundsBtn}
          onClick={this.skip(remainingRounds)}
        >
          {t("End game")}
        </Button>
      </ExpansionPanelDetails>
    );
  }

  private skip = (n: number) => {
    return () => {
      if (n <= 0) {
        const { showToast, t } = this.props;
        showToast(t("Already at the last round. Cannot skip."));
        return;
      }

      const { remainingRounds, skip } = this.props;
      const isEndGame = remainingRounds <= n;
      skip(n);

      if (!isEndGame) {
        window.setTimeout(() => {
          const { init, currentGame, currentRound, showToast, t } = this.props;
          init(currentGame);

          if (currentRound !== null) {
            const msg = t(
              "Skipped round(s). You are now playing round {{round}}",
              { round: currentRound }
            );
            showToast(msg);
          }
        }, 0);
      }
    };
  };
}

export const SkipRounds = flowRight(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SkipRoundsImpl);
