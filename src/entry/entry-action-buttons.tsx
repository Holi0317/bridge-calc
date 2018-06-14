import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ContentAdd from '@material-ui/icons/Add'
import FileDownload from '@material-ui/icons/FileDownload'
import {addRandomPlayerAction} from './actions/add-player'
import {setImportOpenAction} from './actions/set-entry-props'
import {Dispatch, ITranslateMixin} from '../types'
import style from './entry.pcss'

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    addRandomPlayer: addRandomPlayerAction,
    setImportOpen: setImportOpenAction
  }, dispatch)

type dispatchType = ReturnType<typeof mapDispatchToProps>

type EntryActionButtonsProps = dispatchType & ITranslateMixin

export function EntryActionButtonsImpl({addRandomPlayer, setImportOpen, t}: EntryActionButtonsProps) {
  return (
    <div className={style.actionButtonContainer}>
      <Tooltip title={t('Add player')}>
        <IconButton onClick={addRandomPlayer}>
          <ContentAdd width="28px" height="28px" />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('Import names')}>
        <IconButton onClick={() => setImportOpen(true)}>
          <FileDownload width="28px" height="28px" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export const EntryActionButtons = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(EntryActionButtonsImpl)
