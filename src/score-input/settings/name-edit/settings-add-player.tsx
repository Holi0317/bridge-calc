import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {$call} from 'utility-types'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {bindActionCreators, Dispatch} from 'redux'
import {addRandomNameAction} from '../actions/add-name'
import {ITranslateMixin} from '../../../types'
import style from './name-edit.css'

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    addPlayer: addRandomNameAction
  }, dispatch)

const dispatchType = $call(mapDispatchToProps)

type SettingsAddPlayerProps = typeof dispatchType & ITranslateMixin

export function SettingsAddPlayerImpl({addPlayer, t}: SettingsAddPlayerProps) {
  return <div className={style.addContainer}>
    <IconButton tooltip={t('Add player')} onClick={addPlayer}>
      <ContentAdd width="28px" height="28px" />
    </IconButton>
  </div>
}

export const SettingsAddPlayer = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(SettingsAddPlayerImpl)
