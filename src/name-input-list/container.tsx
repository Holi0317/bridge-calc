import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import styled from "styled-components";
import { NameInputListProps, NameInputEntry } from "./types";
import { SortableItem } from "./item";

/**
 * Create a change handler for change in input.
 * This will call change handler provided with new value once the returned function of returned function is called.
 * (Yes, this curries 2 times)
 */
function createChangeHandler(
  items: NameInputEntry[],
  change: (newItems: NameInputEntry[]) => void
) {
  return (index: number) => (newValue: string) => {
    const newItems = items.slice();
    newItems[index] = {
      ...items[index],
      value: newValue
    };
    return change(newItems);
  };
}

/**
 * Create a remove handler function.
 * This will call change handler once the second returned function is called.
 */
function createRemoveHandler(
  items: NameInputEntry[],
  change: (newItems: NameInputEntry[]) => void
) {
  return (index: number) => () => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    return change(newItems);
  };
}

const Root = styled.div`
  width: 100%;
`;

export function ContainerImpl({ values, onChange }: NameInputListProps) {
  const changeHandler = createChangeHandler(values, onChange);
  const removeHandler = createRemoveHandler(values, onChange);

  return (
    <Root>
      {values.map((entry, index) => (
        <SortableItem
          key={entry.id}
          index={index}
          value={entry.value}
          error={entry.error}
          onChange={changeHandler(index)}
          remove={removeHandler(index)}
        />
      ))}
    </Root>
  );
}

export const Container = SortableContainer(ContainerImpl);
