import React from "react";
import styled from "styled-components";
import { Container } from "../../material/container";
import { UsedTimeDisplay } from "./used-time-display";
import { StackInput } from "./stack-input";
import { ActionButtons } from "./action-buttons";
import { MiniScoreboard } from "./mini-scoreboard";
import { ProtectedView } from "../protected-view";

import { Paper, Divider } from "@material-ui/core";

const ActionContainer = styled(Paper)`
  padding: 1em;
  margin-bottom: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  min-height: 200px;
  overflow: hidden;
  z-index: 1;
  position: relative;
`;

export function EnterImpl() {
  return (
    <Container>
      <UsedTimeDisplay />

      <ActionContainer>
        <StackInput />
        <Divider />
        <ActionButtons />
      </ActionContainer>

      <MiniScoreboard />
    </Container>
  );
}

export function Enter() {
  return <ProtectedView comp={EnterImpl} />;
}
