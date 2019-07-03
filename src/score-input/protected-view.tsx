import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { bindActionCreators } from "redux";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import { GameStage } from "./game-stage";
import { stageSelector } from "./selectors/stage";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { IRootState, Dispatch } from "../types";

interface IProtectedViewProps {
  comp: React.ComponentType<{}>;
}

const mapStateToProps = (state: IRootState) => ({
  ended: stageSelector(state) === GameStage.ended
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showToast: showToastAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type ProtectedViewProps = IProtectedViewProps &
  stateType &
  dispatchType &
  WithTranslation;

export class ProtectedViewImpl extends React.Component<ProtectedViewProps> {
  public componentWillMount() {
    this.attemptShowToast(this.props);
  }

  public componentWillReceiveProps(props: ProtectedViewProps) {
    this.attemptShowToast(props);
  }

  public render() {
    const { comp: Comp, ended } = this.props;
    return (
      <Route
        render={() => {
          if (ended) {
            return <Redirect to="/score-input/scoreboard" />;
          }
          return <Comp />;
        }}
      />
    );
  }

  private attemptShowToast({ ended, showToast, t }: ProtectedViewProps) {
    if (ended) {
      showToast(t("Game has ended"));
    }
  }
}

export const ProtectedView = flowRight(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProtectedViewImpl) as React.ComponentType<IProtectedViewProps>;
