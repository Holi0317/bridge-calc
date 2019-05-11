import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "../../types";
import { ScoreboardTable } from "../scoreboard/scoreboard-table";

const mapStateToProps = (state: IRootState) => ({
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
