import React from "react";
import { Container } from "../../material/container";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { UsedTimeDisplay } from "./used-time-display";
import { StackInput } from "./stack-input";
import { ActionButtons } from "./action-buttons";
import { MiniScoreboard } from "./mini-scoreboard";
import { ProtectedView } from "../protected-view";
import classes from "./enter.pcss";

export function EnterImpl() {
  return (
    <Container>
      <UsedTimeDisplay />

      <Paper className={classes.actionContainer}>
        <StackInput />
        <Divider />
        <ActionButtons />
      </Paper>

      <MiniScoreboard />
    </Container>
  );
}

export function Enter() {
  return <ProtectedView comp={EnterImpl} />;
}
