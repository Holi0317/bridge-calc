import React from "react";
import { SortEnd } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Container } from "./container";
import { NameInputListProps } from "./types";

/**
 * Create a callback for sortEnd because of change in sorting.
 */
function createSortEndHandler<T>(items: T[], change: (item: T[]) => void) {
  return ({ oldIndex, newIndex }: SortEnd) =>
    change(arrayMove(items, oldIndex, newIndex));
}

export function NameInputList({ values, onChange }: NameInputListProps) {
  return (
    <Container
      useDragHandle={true}
      lockAxis="y"
      helperClass="sortable-hoc__dragging"
      onSortEnd={createSortEndHandler(values, onChange)}
      values={values}
      onChange={onChange}
    />
  );
}
