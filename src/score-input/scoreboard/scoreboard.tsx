import * as React from "react";
import { connect } from "react-redux";
import { Container } from "../../material/container";
import { ScoreboardTable } from "./scoreboard-table";
import { RootState } from "../../types";
import classes from "./scoreboard.pcss";

const mapStateToProps = (state: RootState) => ({
  entry: state.currentGame
});

type stateType = ReturnType<typeof mapStateToProps>;

export function ScoreboardImpl({ entry }: stateType) {
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

export const Scoreboard = connect(mapStateToProps)(ScoreboardImpl);
