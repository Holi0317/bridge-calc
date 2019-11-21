import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import { DragHandle as DragHandleIcon } from "@material-ui/icons";
import styled from "styled-components";

const StyledHandle = styled(DragHandleIcon)`
  width: 42px;
  height: 24px;
  cursor: move;
  cursor: grab;

  .sortable-hoc__dragging & {
    cursor: move;
    cursor: grabbing;
    pointer-events: auto !important;
  }
`;

export const DragHandle = SortableHandle(() => <StyledHandle color="action" />);
