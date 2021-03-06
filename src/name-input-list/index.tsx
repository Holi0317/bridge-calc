import * as React from 'react'
import {arrayMove, SortEnd} from 'react-sortable-hoc'
import {Container} from './container'
import {INameInputListProps} from './types'
import classes from './name-input-list.pcss'

function createSortEndHandler<T>(items: T[], change: (item: T[]) => void) {
  return ({oldIndex, newIndex}: SortEnd) => change(arrayMove(items, oldIndex, newIndex))
}

export function NameInputList<T, V>({values, onChange, error, getter, setter, errorGetter}: INameInputListProps<T, V>) {
  return (
    <Container useDragHandle={true} lockAxis="y" helperClass={classes.dragging}
      values={values} error={error}
      getter={getter} setter={setter} errorGetter={errorGetter}
      onChange={onChange} onSortEnd={createSortEndHandler(values, onChange)} />
  )
}
