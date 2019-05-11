import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { closeGameModalAction } from "./actions/game-modal";
import { Dispatch } from "../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      closeModal: closeGameModalAction
    },
    dispatch
  );

type dispatchType = ReturnType<typeof mapDispatchToProps>;

/**
 * Reset dialog when this component mounts
 */
export class ResetModalImpl extends React.Component {
  public props: dispatchType;

  public componentDidMount() {
    this.props.closeModal();
  }

  public render() {
    return null;
  }
}

export const ResetModal = connect(
  null,
  mapDispatchToProps
)(ResetModalImpl);
