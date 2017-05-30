// @flow
import {h} from 'preact'
import {translate} from 'react-i18next'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import {IconButton} from './mdc/icon-button'
import Textfield from 'preact-material-components/Textfield/Textfield'
import MdDragHandle from 'react-icons/md/drag-handle'
import MdDelete from 'react-icons/md/delete'
import style from './name-input-list.css'

/**
 * Create a change handler function.
 * Type signature of this function is:
 * items: string[] -> change: (string[] -> T) -> index: number -> value: string -> T
 */
const createChangeHandler = (items: string[]) => (change: (names: string[]) => void) => (index: number) => (value: string) => {
  const newItems = items.slice()
  newItems[index] = value
  return change(newItems)
}

/**
 * Create a remove handler function.
 * Type signature of this function is:
 * items: string[] -> change: (string[] -> T) -> index: number -> () -> T
 */
const createRemoveHandler = (items: string[]) => (change: (names: string[]) => void) => (index: number) => () => {
  const newItems = items.slice()
  newItems.splice(index, 1)
  return change(newItems)
}

const createSortEndHandler = (items, change) => ({oldIndex, newIndex}) => change(arrayMove(items, oldIndex, newIndex))

const DragHandle = SortableHandle(() => <MdDragHandle className={style.handle} />)

const SortableItem = SortableElement(translate()(({value, onChange, remove, error, t}) => (
  <div className={style.itemContainer}>
    <DragHandle />
    <Textfield type="text" label={t('Player name')} value={value} error={error} onChange={onChange} className={style.input} />
    <IconButton icon={<MdDelete />} onClick={remove} />
  </div>
)))

const SortableList = SortableContainer(({names, error, onChange}) => {
  const changeHandler = createChangeHandler(names)(onChange)
  const removeHandler = createRemoveHandler(names)(onChange)
  return (
    <div>
      {names.map((name, index) => (
        <SortableItem key={`item-${index}`} index={index} value={name} error={error[index] || ''} onChange={changeHandler(index)} remove={removeHandler(index)} />
      ))}
    </div>
  )
})

export type NameInputListProperties = {
  names: string[],
  onChange: (names: string[]) => void,
  error: ?string[]
}

export function NameInputList({names, onChange, error}: NameInputListProperties) {
  return (
    <SortableList names={names} error={error || []} useDragHandle={true} lockAxis="y" helperClass={style.dragging} onChange={onChange} onSortEnd={createSortEndHandler(names, onChange)} />
  )
}
