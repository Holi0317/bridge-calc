import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {SortableElement} from 'react-sortable-hoc'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import ActionDelete from '@material-ui/icons/Delete'
import {DragHandle} from './drag-handle'
import {ITranslateMixin} from '../types'
import classes from './name-input-list.pcss'

interface ISortableItemProps extends ITranslateMixin {
  value: string,
  error: string | null
  onChange: React.EventHandler<React.KeyboardEvent<{}>>,
  remove(): void,
}

export function SortableItemImpl({value, onChange, remove, error, t}: ISortableItemProps) {
  return (
    <div className={classes.itemContainer}>
      <DragHandle />
      <TextField type="text" fullWidth label={t('Player name')}
                 margin="normal"
                 value={value} error={error != null && error !== ''} helperText={error}
                 onChange={(event: any) => onChange(event.target.value)} />
      <Tooltip title={t('Delete name')}>
        <IconButton onClick={remove}><ActionDelete width="24px" height="24px" /></IconButton>
      </Tooltip>
    </div>
  )
}

export const SortableItem = flowRight(
  SortableElement,
  translate()
)(SortableItemImpl) as React.ComponentType<any>
