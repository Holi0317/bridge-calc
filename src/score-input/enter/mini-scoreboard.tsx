import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../types";
import { ScoreboardTable } from "../scoreboard/scoreboard-table";

const mapStateToProps = (state: RootState) => ({
  entry: state.currentGame
});

type stateType = ReturnType<typeof mapStateToProps>;

export function MiniScoreboardImpl({ entry }: stateType) {
  if (entry == null) {
    return null;
  }
  return <ScoreboardTable entry={entry} mini />;
}

export const MiniScoreboard = connect(mapStateToProps)(MiniScoreboardImpl);
