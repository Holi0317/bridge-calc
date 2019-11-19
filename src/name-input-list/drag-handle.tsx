import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import EditorDragHandle from "@material-ui/icons/DragHandle";
import styled from "styled-components/macro";

const StyledHandle = styled(EditorDragHandle)`
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
