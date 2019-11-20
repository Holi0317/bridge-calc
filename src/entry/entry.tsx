import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { Container } from "../material/container";
import { EntryPlayerList } from "./entry-player-list";
import { InitEntryState } from "./init-entry-state";
import { EntryActionButtons } from "./entry-action-buttons";
import { CollapsedEntryOptions } from "./collapsed-entry-options";
import { EntryStartButton } from "./entry-start-button";
import { ImportNamesDialog } from "./import-names";
import { Divider } from "@material-ui/core";

const Title = styled.h3`
  color: ${props => props.theme.palette.text.primary};
`;

export function Entry() {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("Player Names")}</Title>
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
