import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import Button from '@material-ui/core/Button'
import {allowNamesCommitSelector} from '../selectors/allow-names-commit'
import {isMakerCleanSelector} from '../selectors/is-maker-clean'
import {settingsValidator} from '../settings-validator'
import {IRootState, ITranslateMixin} from '../../../types'
import style from './name-edit.css'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  error: settingsValidator(state, t).misc,
  changeDisabled: !allowNamesCommitSelector(state, t),
  makerClean: isMakerCleanSelector(state)
})

type stateType = ReturnType<typeof mapStateToProps>

interface IActionButtonProps {
  requestDialog(): void
}

export class ActionButtonsImpl extends React.Component {
  public props: IActionButtonProps & stateType & ITranslateMixin

  public render() {
    const {changeDisabled, makerClean, error, requestDialog, t} = this.props
    const errMsg = makerClean ? error : t('Player name edit is disabled when editing maker')
    return <div className={style.btnContainer}>
      <Button variant="contained" color="primary" disabled={changeDisabled} onClick={requestDialog}>
        {t('Change names')}
      </Button>
      <span className={style.errorMessage}>{errMsg}</span>
    </div>
  }
}

export const ActionButtons = flowRight(
  translate(),
  connect(mapStateToProps)
)(ActionButtonsImpl) as React.ComponentType<IActionButtonProps>
