import {h} from 'preact'
import {translate} from 'react-i18next'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import {IconButton} from 'react-toolbox/components/button'
import Input from 'react-toolbox/components/input'
import MdDragHandle from 'react-icons/md/drag-handle'
import MdDelete from 'react-icons/md/delete'
import style from './name-input-list.css'

/**
 * Create a change handler function.
 * Type signature of this function is:
 * items: string[] -> change: (string[] -> T) -> index: number -> value: string -> T
 */
const createChangeHandler = items => change => index => value => {
  const newItems = items.slice()
  newItems[index] = value
  return change(newItems)
}

/**
 * Create a remove handler function.
 * Type signature of this function is:
 * items: string[] -> change: (string[] -> T) -> index: number -> () -> T
 */
const createRemoveHandler = items => change => index => () => {
  const newItems = items.slice()
  newItems.splice(index, 1)
  return change(newItems)
}

const createSortEndHandler = (items, change) => ({oldIndex, newIndex}) => change(arrayMove(items, oldIndex, newIndex))

const DragHandle = SortableHandle(() => <MdDragHandle className={style.handle} />)

const SortableItem = SortableElement(translate()(({value, onChange, remove, t}) => (
  <div className={style.itemContainer}>
    <DragHandle />
    <Input type="text" label={t('Player name')} value={value} onChange={onChange} className={style.input} />
    <IconButton icon={<MdDelete />} onMouseUp={remove} />
  </div>
)))

export const SortableList = SortableContainer(({names, onChange}) => {
  const changeHandler = createChangeHandler(names)(onChange)
  const removeHandler = createRemoveHandler(names)(onChange)
  return (
    <div>
      {names.map((name, index) => (
        <SortableItem key={`item-${index}`} index={index} value={name} onChange={changeHandler(index)} remove={removeHandler(index)} />
      ))}
    </div>
  )
})

export function NameInputList({names, onChange}) {
  return (
    <SortableList names={names} useDragHandle={true} lockAxis="y" helperClass={style.dragging} onChange={onChange} onSortEnd={createSortEndHandler(names, onChange)} />
  )
}
