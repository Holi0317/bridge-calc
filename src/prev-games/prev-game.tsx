import React from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@material-ui/icons/Delete";
import { PrevGameEntry } from "./types";

import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Tooltip
} from "@material-ui/core";

export interface PrevGameProps {
  game: PrevGameEntry;
  requestDelete(): void;
  requestDetail(): void;
}

export function PrevGame({
  game,
  requestDelete,
  requestDetail
}: PrevGameProps) {
  const { t } = useTranslation();

  return (
    <ListItem button onClick={requestDetail}>
      <ListItemText
        primary={t("Game on {{date}}", {
          date: format(game.startTime, "DD MMM YYYY")
        })}
        secondary={t("With {{players}}", {
          players: Object.values(game.names).join(", ")
        })}
      />
      <ListItemSecondaryAction>
        <Tooltip title={t("Delete")}>
          <IconButton aria-label="Delete" onClick={requestDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
