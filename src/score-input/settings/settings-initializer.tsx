import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initSettingsAction } from "./actions/init-settings";
import { RootState, Dispatch } from "../../types";

const mapStateToProps = (state: RootState) => ({
  currentGame: state.currentGame
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      init: initSettingsAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type SettingsInitializerProps = stateType & dispatchType;

export class SettingsInitializerImpl extends React.Component<
  SettingsInitializerProps
> {
  public componentWillMount() {
    const { init, currentGame } = this.props;
    init(currentGame);
  }

  public render() {
    return null;
  }
}

export const SettingsInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsInitializerImpl);
