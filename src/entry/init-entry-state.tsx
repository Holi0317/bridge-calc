import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { genRandomNames } from "../example-names";
import { setPlayerNamesAction } from "./actions/set-entry-props";
import { resetAction } from "./actions/reset";
import { Dispatch } from "../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { reset: resetAction, setPlayerNames: setPlayerNamesAction },
    dispatch
  );

type dispatchType = ReturnType<typeof mapDispatchToProps>;

type InitEntryStateProps = dispatchType;

export class InitEntryStateImpl extends React.PureComponent<
  InitEntryStateProps
> {
  public componentWillMount() {
    this.props.reset();
    this.props.setPlayerNames(genRandomNames());
  }

  public render() {
    return null;
  }
}

export const InitEntryState = connect(
  null,
  mapDispatchToProps
)(InitEntryStateImpl);
