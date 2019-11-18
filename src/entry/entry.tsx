import React from "react";
import { useTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import { Container } from "../material/container";
import { EntryPlayerList } from "./entry-player-list";
import { InitEntryState } from "./init-entry-state";
import { EntryActionButtons } from "./entry-action-buttons";
import { CollapsedEntryOptions } from "./collapsed-entry-options";
import { EntryStartButton } from "./entry-start-button";
import { ImportNamesDialog } from "./import-names";
import classes from "./entry.pcss";

export function Entry() {
  const { t } = useTranslation();

  return (
    <Container>
      <h3 className={classes.text}>{t("Player Names")}</h3>
      <EntryPlayerList />
      <EntryActionButtons />
      <Divider />

      <CollapsedEntryOptions />

      <EntryStartButton />
      <ImportNamesDialog />
      <InitEntryState />
    </Container>
  );
}
