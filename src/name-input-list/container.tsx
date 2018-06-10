import * as React from 'react'
import {SortableContainer} from 'react-sortable-hoc'
import {INameInputListProps, Setter} from './types'
import {SortableItem} from './item'

/**
 * Create a change handler for change in input.
 * This will call change handler provided with new value once the returned function of returned function is called.
 * (Yes, this curries 2 times)
 */
function createChangeHandler<T>(items: T[], setter: Setter<T>, change: (newItems: T[]) => void) {
  return (index: number) => (newValue: string) => {
    const newItems = items.slice()
    newItems[index] = setter(newValue, items[index])
    return change(newItems)
  }
}

/**
 * Create a remove handler function.
 * This will call change handler once the second returned function is called.
 */
function createRemoveHandler<T>(items: T[], change: (newItems: T[]) => void) {
  return (index: number) => () => {
    const newItems = items.slice()
    newItems.splice(index, 1)
    return change(newItems)
  }
}

export function ContainerImpl<T, V>(props: INameInputListProps<T, V>) {
  const {values, error, getter, setter, errorGetter, onChange} = props
  const changeHandler = createChangeHandler(values, setter, onChange)
  const removeHandler = createRemoveHandler(values, onChange)
  return (
    <div>
      {values.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index}
                      value={getter(value)} error={errorGetter(error, value, index)}
                      onChange={changeHandler(index)} remove={removeHandler(index)} />
      ))}
    </div>
  )
}

export const Container = SortableContainer(ContainerImpl)
