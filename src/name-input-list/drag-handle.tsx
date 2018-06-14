import * as React from 'react'
import {SortableHandle} from 'react-sortable-hoc'
import EditorDragHandle from '@material-ui/icons/DragHandle'
import style from './name-input-list.pcss'

export const DragHandle = SortableHandle(() => <EditorDragHandle color="action" className={style.handle} />)
