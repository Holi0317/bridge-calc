import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../../material/container";
import { ScoreboardTable } from "./scoreboard-table";
import classes from "./scoreboard.pcss";
import { currentGameSelector } from "../selectors/current-game";

export function Scoreboard() {
  const entry = useSelector(currentGameSelector);

  return (
    <Container>
      {entry && (
        <div className={classes.scoreboardContainer}>
          <ScoreboardTable entry={entry} mini={false} />
        </div>
      )}
    </Container>
  );
}
