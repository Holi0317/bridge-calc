import React from "react";
import { useSelector } from "react-redux";
import { ScoreboardTable } from "../scoreboard/scoreboard-table";
import { currentGameSelector } from "../selectors/current-game";

export function MiniScoreboard() {
  const entry = useSelector(currentGameSelector);

  if (entry == null) {
    return null;
  }
  return <ScoreboardTable entry={entry} mini />;
}
