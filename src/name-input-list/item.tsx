import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {SortableElement} from 'react-sortable-hoc'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import {DragHandle} from './drag-handle'
import style from './name-input-list.css'
import {ITranslateMixin} from '../types'

type SortableItemProps = {
  value: string,
  onChange: React.EventHandler<React.KeyboardEvent<{}>>,
  remove: () => void,
  error: string | null
} & ITranslateMixin

export function SortableItemImpl({value, onChange, remove, error, t}: SortableItemProps) {
  return (
    <div className={style.itemContainer}>
      <DragHandle />
      <TextField type="text" fullWidth={true} floatingLabelText={t('Player name')} value={value} errorText={error} onChange={onChange} />
      <IconButton onClick={remove}><ActionDelete width="24px" height="24px" /></IconButton>
    </div>
  )
}

export const SortableItem = flowRight(
  SortableElement,
  translate()
)(SortableItemImpl)
