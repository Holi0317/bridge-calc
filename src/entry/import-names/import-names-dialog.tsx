import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { ImportNamesContent } from "./import-names-content";
import { setImportOpenAction } from "../actions/set-entry-props";
import { Dispatch, RootState } from "../../types";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";

const mapStateToProps = (state: RootState) => ({
  open: state.entry.importOpened
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setImportOpen: setImportOpenAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type ImportNamesDialogProps = stateType & dispatchType;

export function ImportNamesDialogImpl({
  open,
  setImportOpen
}: ImportNamesDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={() => setImportOpen(false)}>
      <DialogTitle>{t("Import names from previous games")}</DialogTitle>
      <DialogContent>
        <ImportNamesContent />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setImportOpen(false)}>
          {t("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const ImportNamesDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportNamesDialogImpl);
