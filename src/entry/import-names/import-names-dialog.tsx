import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ImportNamesContent } from "./import-names-content";
import { setImportOpenAction } from "../actions/set-entry-props";
import { RootState } from "../../types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { useAction } from "../../hooks/use-action";

export function ImportNamesDialog() {
  const { t } = useTranslation();

  const open = useSelector((state: RootState) => state.entry.importOpened);

  const setImportOpen = useAction(setImportOpenAction);

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
