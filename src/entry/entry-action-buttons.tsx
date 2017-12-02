import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import {addRandomPlayer} from './actions/add-player'
import {ITranslateMixin} from '../types'
import style from './entry.css'

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({addRandomPlayer}, dispatch)

const dispatchType = returntypeof(mapDispatchToProps)

type EntryActionButtonsProps = typeof dispatchType & ITranslateMixin

export function EntryActionButtonsImpl({addRandomPlayer, t}: EntryActionButtonsProps) {
  return (
    <div className={style.actionButtonContainer}>
      <IconButton tooltip={t('Add player')} onClick={addRandomPlayer}>
        <ContentAdd width="28px" height="28px" />
      </IconButton>
      {/* TODO Implement import names click handler */}
      <IconButton tooltip={t('Import names')}>
        <FileDownload width="28px" height="28px" />
      </IconButton>
    </div>
  )
}

export const EntryActionButtons = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(EntryActionButtonsImpl) as React.StatelessComponent<{}>
