import * as React from 'react'
import {connect} from 'react-redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {IRootState, ITranslateMixin} from '../../types'
import {returntypeof} from 'react-redux-typescript'
import {bindActionCreators, Dispatch} from 'redux'
import FlatButton from 'material-ui/FlatButton'
import {setImportOpenAction} from '../actions/set-import-open'
import Dialog from 'material-ui/Dialog'

const mapStateToProps = (state: IRootState) => ({
  open: state.entry.importOpened
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    setImportOpen: setImportOpenAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryActionButtonsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export class ImportNamesDialogImpl extends React.Component {
  public props: EntryActionButtonsProps

  public render() {
    const {open, t} = this.props
    const actions = [
      <FlatButton
        label={t('Cancel')}
        primary={true}
        onClick={this.close}
      />
    ]
    return <Dialog
      title={t('Import names')}
      actions={actions}
      open={open}
      onRequestClose={this.close}
    />
  }

  private close = () => {
    this.props.setImportOpen(false)
  }
}

export const ImportNamesDialog = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ImportNamesDialogImpl)
