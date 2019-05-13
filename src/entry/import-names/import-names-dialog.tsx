import * as React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { ImportNamesContent } from "./import-names-content";
import { setImportOpenAction } from "../actions/set-entry-props";
import { Dispatch, IRootState } from "../../types";

const mapStateToProps = (state: IRootState) => ({
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
