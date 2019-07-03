import * as React from "react";
import { SortableContainer } from "react-sortable-hoc";
import { INameInputListProps, INameInputEntry } from "./types";
import { SortableItem } from "./item";
import classes from "./name-input-list.pcss";

/**
 * Create a change handler for change in input.
 * This will call change handler provided with new value once the returned function of returned function is called.
 * (Yes, this curries 2 times)
 */
function createChangeHandler(
  items: INameInputEntry[],
  change: (newItems: INameInputEntry[]) => void
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
  items: INameInputEntry[],
  change: (newItems: INameInputEntry[]) => void
) {
  return (index: number) => () => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    return change(newItems);
  };
}

export function ContainerImpl({ values, onChange }: INameInputListProps) {
  const changeHandler = createChangeHandler(values, onChange);
  const removeHandler = createRemoveHandler(values, onChange);

  return (
    <div className={classes.container}>
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
    </div>
  );
}

export const Container = SortableContainer(ContainerImpl);
