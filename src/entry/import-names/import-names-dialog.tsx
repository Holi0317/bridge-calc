import * as React from 'react'
import {connect} from 'react-redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {bindActionCreators} from 'redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import {ImportNamesContent} from './import-names-content'
import {setImportOpenAction} from '../actions/set-entry-props'
import {Dispatch, IRootState, ITranslateMixin} from '../../types'

const mapStateToProps = (state: IRootState) => ({
  open: state.entry.importOpened
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    setImportOpen: setImportOpenAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type ImportNamesDialogProps = stateType & dispatchType & ITranslateMixin

export class ImportNamesDialogImpl extends React.Component {
  public props: ImportNamesDialogProps

  public render() {
    const {open, t} = this.props

    return <Dialog open={open} onClose={this.close}>
      <DialogTitle>{t('Import names from previous games')}</DialogTitle>
      <DialogContent><ImportNamesContent /></DialogContent>
      <DialogActions>
        <Button color="primary" onClick={this.close}>{t('Cancel')}</Button>
      </DialogActions>
    </Dialog>
  }

  private close = () => {
    this.props.setImportOpen(false)
  }
}

export const ImportNamesDialog = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ImportNamesDialogImpl)
