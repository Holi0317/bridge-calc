// @flow
import {h} from 'preact'
import {translate} from 'react-i18next'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import {IconButton} from './mdc/icon-button'
import {Input} from './mdc/input'
import MdDragHandle from 'react-icons/md/drag-handle'
import MdDelete from 'react-icons/md/delete'
import style from './name-input-list.css'

type Setter<DataType> = (newVal: string, oldVal: DataType) => DataType

export type NameInputListProps<DataType, ErrorType> = {
  /**
   * Values of data to be filled.
   */
  values: DataType[],
  /**
   * When data is changed (modified, renamed, deleted), this will be called with new data array.
   */
  onChange: (values: DataType[]) => void,
  /**
   * Optional. Error to be displayed under name input.
   */
  error: ErrorType,
  /**
   * Get error from given data.
   * If returned is empty string or null, that implies no error exist.
   */
  errorGetter: (error: ErrorType, value: DataType, index: number) => ?string,
  /**
   * Getter to transform data into string displayed in input field.
   */
  getter: (data: DataType) => string,
  /**
   * This function transform old data to new one with given new value in input field.
   */
  setter: Setter<DataType>
}

/**
 * Create a change handler for change in input.
 * This will call change handler provided with new value once the returned function of returned function is called.
 * (Yes, this curries 2 times)
 */
function createChangeHandler<T>(items: T[], setter: Setter<T>, change: (newItems: T[]) => void) {
  return (index: number) => (value: string) => {
    const newItems = items.slice()
    newItems[index] = setter(value, items[index])
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

const createSortEndHandler = (items, change) => ({oldIndex, newIndex}) => change(arrayMove(items, oldIndex, newIndex))

const DragHandle = SortableHandle(() => <MdDragHandle className={style.handle} />)

const SortableItem = SortableElement(translate()(({value, onChange, remove, error, t}) => (
  <div className={style.itemContainer}>
    <DragHandle />
    <Input type="text" fullWidth={true} label={t('Player name')} value={value} errorMsg={error} onKeyUp={onChange} />
    <IconButton icon={<MdDelete width="24px" height="24px" />} onClick={remove} />
  </div>
)))

const SortableList = SortableContainer(({values, error, getter, setter, errorGetter, onChange}) => {
  const changeHandler = createChangeHandler(values, setter, onChange)
  const removeHandler = createRemoveHandler(values, onChange)
  return (
    <div>
      {values.map((value, index) => (
        <SortableItem key={`item-${index}`}
          index={index} value={getter(value)} error={errorGetter(error, value, index)}
          onChange={changeHandler(index)} remove={removeHandler(index)} />
      ))}
    </div>
  )
})

export function NameInputList<T, V>({values, onChange, error, getter, setter, errorGetter}: NameInputListProps<T, V>) {
  return (
    <SortableList useDragHandle={true} lockAxis="y" helperClass={style.dragging}
      values={values} error={error}
      getter={getter} setter={setter} errorGetter={errorGetter}
      onChange={onChange} onSortEnd={createSortEndHandler(values, onChange)} />
  )
}
