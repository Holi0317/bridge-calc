import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {ListItem} from 'material-ui/List'
import {setImportOpenAction, setPlayerNamesAction} from '../actions/set-entry-props'
import {showToastAction} from '../../toast-singleton/actions/show-toast'
import {Dispatch, ITranslateMixin} from '../../types'

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    setImportOpen: setImportOpenAction,
    showToast: showToastAction,
    setPlayerNames: setPlayerNamesAction
  }, dispatch)

type dispatchType = ReturnType<typeof mapDispatchToProps>

interface INameEntryProps {
  name: string[]
}

export class NameListEntryImpl extends React.Component {
  public props: INameEntryProps & dispatchType & ITranslateMixin

  public render() {
    return <ListItem primaryText={this.props.name.join(', ')} onClick={this.setNames} />
  }

  private setNames = () => {
    const {name, setImportOpen, showToast, setPlayerNames, t} = this.props
    setPlayerNames(name)
    setImportOpen(false)
    showToast(t('Imported names successfully'))
  }
}

export const NameListEntry = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(NameListEntryImpl) as React.ComponentType<INameEntryProps>
