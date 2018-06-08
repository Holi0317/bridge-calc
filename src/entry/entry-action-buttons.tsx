import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import {addRandomPlayerAction} from './actions/add-player'
import {setImportOpenAction} from './actions/set-entry-props'
import {Dispatch, ITranslateMixin} from '../types'
import style from './entry.css'

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
      <IconButton tooltip={t('Add player')} onClick={addRandomPlayer}>
        <ContentAdd width="28px" height="28px" />
      </IconButton>
      <IconButton tooltip={t('Import names')} onClick={() => setImportOpen(true)}>
        <FileDownload width="28px" height="28px" />
      </IconButton>
    </div>
  )
}

export const EntryActionButtons = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(EntryActionButtonsImpl)
