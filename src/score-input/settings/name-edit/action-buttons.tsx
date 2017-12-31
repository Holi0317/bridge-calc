import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {returntypeof} from 'react-redux-typescript'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import RaisedButton from 'material-ui/RaisedButton'
import {IRootState, ITranslateMixin} from '../../../types'
import style from './name-edit.css'
import {settingsValidator} from '../settings-validator'
import {allowNamesCommitSelector} from '../selectors/allow-names-commit'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  error: settingsValidator(state, t).misc,
  changeDisabled: !allowNamesCommitSelector(state, t)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type ActionButtonsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export class ActionButtonsImpl extends React.Component {
  public props: ActionButtonsProps

  public render() {
    const {changeDisabled, error, t} = this.props
    return <div className={style.btnContainer}>
      <RaisedButton label={t('Change names')} primary={true}
                    disabled={changeDisabled} onClick={this.dispatch} />
      <span className={style.errorMessage}>{error}</span>
    </div>
  }

  private dispatch = () => {
    // TODO Show maker chooser, max rounds chooser in a dialog.
    // TODO Validation: Will added player cause insufficient rounds?
  }
}

export const ActionButtons = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ActionButtonsImpl)
