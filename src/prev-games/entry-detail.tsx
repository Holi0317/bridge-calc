import React from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { GameStage } from "../score-input/game-stage";
import { PrevGameEntry } from "./types";

function gameStage(stage: GameStage, t: TFunction): string {
  switch (stage) {
    case GameStage.waitingBid:
      return t("Waiting for Bid stack");
    case GameStage.waitingWin:
      return t("Waiting for win stack");
    case GameStage.ended:
      return t("Ended");
  }
}

interface EntryDetailProps {
  entry: PrevGameEntry;
}

export function EntryDetail({ entry }: EntryDetailProps) {
  const { t } = useTranslation();
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>{t("Starting time")}</TableCell>
          <TableCell>
            {format(entry.startTime, "DD MMM YYYY HH:mm:ss")}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>{t("ID")}</TableCell>
          <TableCell>{entry.id}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>{t("Current Stage")}</TableCell>
          <TableCell>{gameStage(entry.stage, t)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>{t("Total rounds")}</TableCell>
          <TableCell>{entry.rounds}</TableCell>
        </TableRow>

        {entry.stage === GameStage.ended ? (
          <TableRow>
            <TableCell>{t("Ending time")}</TableCell>
            <TableCell>
              {format(entry.endTime, "DD MMM YYYY HH:mm:ss")}
            </TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell>{t("Current round")}</TableCell>
            <TableCell>{entry.currentRound}</TableCell>
          </TableRow>
        )}

        {entry.stage === GameStage.ended && (
          <TableRow>
            <TableCell>{t("Time used")}</TableCell>
            <TableCell>
              {formatDistance(entry.startTime, entry.endTime)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
