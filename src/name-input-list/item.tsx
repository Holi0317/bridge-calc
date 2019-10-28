import * as React from "react";
import { useTranslation } from "react-i18next";
import { SortableElement } from "react-sortable-hoc";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import ActionDelete from "@material-ui/icons/Delete";
import { DragHandle } from "./drag-handle";
import classes from "./name-input-list.pcss";

interface SortableItemProps {
  value: string;
  error: string | null;
  // Actually index is required by the HOC
  index: number;

  onChange(value: string): void;
  remove(): void;
}

export function SortableItemImpl({
  value,
  onChange,
  remove,
  error
}: SortableItemProps) {
  const { t } = useTranslation();

  return (
    <div className={classes.itemContainer}>
      <DragHandle />

      <TextField
        type="text"
        fullWidth
        label={t("Player name")}
        margin="normal"
        value={value}
        error={error != null && error !== ""}
        helperText={error}
        onChange={event => onChange(event.target.value)}
      />

      <Tooltip title={t("Delete name")}>
        <IconButton onClick={remove}>
          <ActionDelete width="24px" height="24px" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export const SortableItem = SortableElement(
  SortableItemImpl
) as React.ComponentType<SortableItemProps>;
