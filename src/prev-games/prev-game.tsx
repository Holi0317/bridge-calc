import React from "react";
import format from "date-fns/format";
import { useTranslation } from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { PrevGameEntry } from "./types";

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
