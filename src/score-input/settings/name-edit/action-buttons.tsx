import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {returntypeof} from 'react-redux-typescript'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import RaisedButton from 'material-ui/RaisedButton'
import {IRootState, ITranslateMixin} from '../../../types'
import style from './name-edit.css'
import {settingsValidator} from '../settings-validator'
import {allowNamesCommitSelector} from '../selectors/allow-names-commit'
import {isMakerCleanSelector} from '../selectors/is-maker-clean'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  error: settingsValidator(state, t).misc,
  changeDisabled: !allowNamesCommitSelector(state, t),
  makerClean: isMakerCleanSelector(state)
})

const stateType = returntypeof(mapStateToProps)

interface IActionButtonProps {
  requestDialog(): void
}

export class ActionButtonsImpl extends React.Component {
  public props: IActionButtonProps & typeof stateType & ITranslateMixin

  public render() {
    const {changeDisabled, makerClean, error, requestDialog, t} = this.props
    const errMsg = makerClean ? error : t('Player name edit is disabled when editing maker')
    return <div className={style.btnContainer}>
      <RaisedButton label={t('Change names')} primary={true}
                    disabled={changeDisabled} onClick={requestDialog} />
      <span className={style.errorMessage}>{errMsg}</span>
    </div>
  }
}

export const ActionButtons = flowRight(
  translate(),
  connect(mapStateToProps)
)(ActionButtonsImpl) as React.ComponentType<IActionButtonProps>
