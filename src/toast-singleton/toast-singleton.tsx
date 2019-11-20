import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeToastAction } from "./actions/close-toast";
import { RootState, Dispatch } from "../types";
import { Snackbar } from "@material-ui/core";

const mapStateToProps = (state: RootState) => ({
  param: state.toastSingleton
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      close: closeToastAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type ToastSingletonProps = stateType & dispatchType;

export function ToastSingletonImpl({ param, close }: ToastSingletonProps) {
  return (
    <Snackbar
      {...param}
      message={<span>{param.message}</span>}
      onClose={close}
    />
  );
}

export const ToastSingleton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastSingletonImpl);
