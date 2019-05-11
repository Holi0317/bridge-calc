import * as React from "react";
import * as format from "date-fns/format";
import { translate } from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { PrevGameEntry } from "./types";
import { ITranslateMixin } from "../types";

export interface IPrevGameProps extends ITranslateMixin {
  game: PrevGameEntry;
  requestDelete(): void;
  requestDetail(): void;
}

export class PrevGameImpl extends React.Component<IPrevGameProps> {
  public render() {
    const { game, requestDelete, requestDetail, t } = this.props;

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
}

export const PrevGame = translate()(PrevGameImpl);
