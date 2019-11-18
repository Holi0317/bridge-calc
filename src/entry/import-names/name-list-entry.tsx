import React from "react";
import { useTranslation } from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  setImportOpenAction,
  setPlayerNamesAction
} from "../actions/set-entry-props";
import { showToastAction } from "../../toast-singleton/actions/show-toast";
import { cuid } from "../../utils";
import { useAction } from "../../hooks/use-action";
import { useCallback } from "react";

interface NameEntryProps {
  name: string[];
}

export function NameListEntry({ name }: NameEntryProps) {
  const { t } = useTranslation();
  const setImportOpen = useAction(setImportOpenAction);
  const showToast = useAction(showToastAction);
  const setPlayerNames = useAction(setPlayerNamesAction);

  const setNames = useCallback(() => {
    setPlayerNames(name.map(entry => ({ value: entry, id: cuid() })));
    setImportOpen(false);
    showToast(t("Imported names successfully"));
  }, [name, setImportOpen, showToast, setPlayerNames, t]);

  return (
    <ListItem button onClick={setNames}>
      <ListItemText primary={name.join(", ")} />
    </ListItem>
  );
}
