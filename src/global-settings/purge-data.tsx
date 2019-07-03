import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { bindActionCreators } from "redux";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { replaceCurrentGameAction } from "../score-input/actions/replace-current-game";
import { resetGamesAtion } from "../prev-games/actions/reset-games";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { Dispatch } from "../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setCurrentGame: replaceCurrentGameAction,
      resetPrevGames: resetGamesAtion,
      showToast: showToastAction
    },
    dispatch
  );

type dispatchType = ReturnType<typeof mapDispatchToProps>;

type PurgeDataProps = dispatchType & WithTranslation;

export class PurgeDataImpl extends React.Component<PurgeDataProps> {
  public render() {
    const { t } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.clear}>
          {t("Clear all data")}
        </Button>
      </div>
    );
  }

  private clear = () => {
    const { showToast, t, setCurrentGame, resetPrevGames } = this.props;
    setCurrentGame(null);
    resetPrevGames();
    showToast(t("All data is cleared"));
  };
}

export const PurgeData = flowRight(
  withTranslation(),
  connect(
    null,
    mapDispatchToProps
  )
)(PurgeDataImpl);
