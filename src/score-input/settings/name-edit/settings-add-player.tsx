import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ContentAdd from '@material-ui/icons/Add'
import {addRandomNameAction} from '../actions/add-name'
import {ITranslateMixin, Dispatch} from '../../../types'
import style from './name-edit.css'

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    addPlayer: addRandomNameAction
  }, dispatch)

type dispatchType = ReturnType<typeof mapDispatchToProps>

type SettingsAddPlayerProps = dispatchType & ITranslateMixin

export function SettingsAddPlayerImpl({addPlayer, t}: SettingsAddPlayerProps) {
  return <div className={style.addContainer}>
    <Tooltip title={t('Add player')}>
      <IconButton onClick={addPlayer}>
        <ContentAdd width="28px" height="28px" />
      </IconButton>
    </Tooltip>
  </div>
}

export const SettingsAddPlayer = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(SettingsAddPlayerImpl)
