import React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import styled from "styled-components/macro";
import { ScoreCell } from "./score-cell";
import { GameState } from "../reducer";
import { computeData } from "./compute-data";

interface ScoreboardTableProps {
  entry: NonNullable<GameState>;
  mini: boolean;
}

const TableContainer = styled(Paper)`
  overflow-x: auto;
`;

const StyledTable = styled(Table)`
  white-space: nowrap;
`;

export function ScoreboardTable({ entry, mini }: ScoreboardTableProps) {
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
    <TableContainer>
      <StyledTable>
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
                <ScoreCell key={playerID}>{score}</ScoreCell>
              ))}
            </TableRow>
          ) : (
            endedRounds.map(i => (
              <TableRow key={i}>
                <TableCell>{t("Round {{n}}", { n: i })}</TableCell>
                {Object.entries(scores).map(([playerID, score]) => (
                  <ScoreCell key={playerID}>{score[i - 1]}</ScoreCell>
                ))}
              </TableRow>
            ))
          )}

          {/* Total scores */}
          <TableRow>
            <TableCell>{t("Total score")}</TableCell>
            {Object.entries(totalScores).map(([playerID, total]) => (
              <ScoreCell bold key={playerID}>
                {total}
              </ScoreCell>
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
      </StyledTable>
    </TableContainer>
  );
}
