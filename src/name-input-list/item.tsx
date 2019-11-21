import React from "react";
import { useTranslation } from "react-i18next";
import { SortableElement } from "react-sortable-hoc";
import { Delete as DeleteIcon } from "@material-ui/icons";
import styled from "styled-components";
import { DragHandle } from "./drag-handle";

import { IconButton, TextField, Tooltip } from "@material-ui/core";

interface SortableItemProps {
  value: string;
  error: string | null;
  // Actually index is required by the HOC
  index: number;

  onChange(value: string): void;
  remove(): void;
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export function SortableItemImpl({
  value,
  onChange,
  remove,
  error
}: SortableItemProps) {
  const { t } = useTranslation();

  return (
    <ItemContainer>
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
          <DeleteIcon width="24px" height="24px" />
        </IconButton>
      </Tooltip>
    </ItemContainer>
  );
}

export const SortableItem = SortableElement(
  SortableItemImpl
) as React.ComponentType<SortableItemProps>;
