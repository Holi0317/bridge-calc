import * as React from 'react'
import {SortableHandle} from 'react-sortable-hoc'
import EditorDragHandle from '@material-ui/icons/DragHandle'
import style from './name-input-list.css'

export const DragHandle = SortableHandle(() => <EditorDragHandle className={style.handle} />)
