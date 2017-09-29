import * as React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import flowRight from 'lodash-es/flowRight'
import {IAddPlayerAction, ADD_PLAYER} from './entry-actions'
import {randomName} from '../example-names'
import {Dispatch, ITranslateMixin} from '../types'
import style from './entry.css'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addPlayer() {
    const action: IAddPlayerAction = {type: ADD_PLAYER, payload: randomName()}
    dispatch(action)
  },
  importNames() {
    // TODO NYI
  }
})

const dispatchType = returntypeof(mapDispatchToProps)

type EntryActionButtonsProps = typeof dispatchType & ITranslateMixin

export function EntryActionButtonsImpl({addPlayer, importNames, t}: EntryActionButtonsProps) {
  return (
    <div className={style.actionButtonContainer}>
      <IconButton tooltip={t('Add player')} onClick={addPlayer}>
        <ContentAdd width="28px" height="28px" />
      </IconButton>
      <IconButton tooltip={t('Import names')} onClick={importNames}>
        <FileDownload width="28px" height="28px" />
      </IconButton>
    </div>
  )
}

export const EntryActionButtons = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(EntryActionButtonsImpl)
