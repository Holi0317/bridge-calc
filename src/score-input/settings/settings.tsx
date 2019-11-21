import React from "react";
import styled from "styled-components";
import { Container } from "../../material/container";
import { NameEdit } from "./name-edit";
import { RoundManagement } from "./round-management";
import { SettingsInitializer } from "./settings-initializer";
import { ChangeMaker } from "./change-maker";
import { ProtectedView } from "../protected-view";

const PanelContainer = styled.div`
  padding-top: 1em;
`;

export function SettingsImpl() {
  return (
    <Container>
      <PanelContainer>
        <NameEdit />
        <ChangeMaker />
        <RoundManagement />
      </PanelContainer>

      <SettingsInitializer />
    </Container>
  );
}

export function Settings() {
  return <ProtectedView comp={SettingsImpl} />;
}
