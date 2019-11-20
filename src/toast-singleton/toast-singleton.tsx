import React from "react";
import { useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { closeToastAction } from "./actions/close-toast";
import { RootState } from "../types";
import { useAction } from "../hooks/use-action";

export function ToastSingleton() {
  const param = useSelector((state: RootState) => state.toastSingleton);

  const close = useAction(closeToastAction);

  return (
    <Snackbar
      {...param}
      message={<span>{param.message}</span>}
      onClose={close}
    />
  );
}
