import * as React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { GameState } from "../reducer";
import { computeData } from "./compute-data";
import classes from "./scoreboard.pcss";

interface IScoreboardTableProps {
  entry: NonNullable<GameState>;
  mini: boolean;
}

export function ScoreboardTable({ entry, mini }: IScoreboardTableProps) {
  const {
    names,
    scores,
    prevScores,
    totalScores,
    ranks,
    endedRounds
  } = computeData(entry);
  const { t } = useTranslation();

  return (
    <Paper className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          {/* Player names */}
          <TableRow>
            <TableCell>{t("Name")}</TableCell>
            {Object.entries(names).map(([playerID, name]) => (
              <TableCell key={playerID}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {mini ? (
            <TableRow>
              <TableCell>{t("Previous round score")}</TableCell>
              {Object.entries(prevScores).map(([playerID, score]) => (
                <TableCell
                  align="right"
                  key={playerID}
                  className={score < 0 ? classes.errorText : ""}
                >
                  {score}
                </TableCell>
              ))}
            </TableRow>
          ) : (
            endedRounds.map(i => (
              <TableRow key={i}>
                <TableCell>{t("Round {{n}}", { n: i })}</TableCell>
                {Object.entries(scores).map(([playerID, score]) => (
                  <TableCell
                    align="right"
                    key={playerID}
                    className={score[i - 1] < 0 ? classes.errorText : ""}
                  >
                    {score[i - 1]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}

          {/* Total scores */}
          <TableRow className={classes.totalScore}>
            <TableCell>{t("Total score")}</TableCell>
            {Object.entries(totalScores).map(([playerID, total]) => (
              <TableCell
                align="right"
                key={playerID}
                className={total < 0 ? classes.errorText : ""}
              >
                {total}
              </TableCell>
            ))}
          </TableRow>

          {/* Rank */}
          <TableRow>
            <TableCell>{t("Rank")}</TableCell>
            {Object.entries(ranks).map(([playerID, rank]) => (
              <TableCell align="right" key={playerID}>
                {rank}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
