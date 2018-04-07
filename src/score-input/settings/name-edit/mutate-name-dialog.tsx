import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown} from '../../../material/dropdown'
import {makerSourceSelector} from '../selectors/maker-source'
import {namesSelector} from '../selectors/names'
import {expectedRoundsSelector} from '../selectors/expected-rounds'
import {changePlayersAction} from '../../actions/change-players'
import {showToastAction} from '../../../toast-singleton/actions/show-toast'
import {initSettingsAction} from '../actions/init-settings'
import {IRootState, ITranslateMixin} from '../../../types'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  names: namesSelector(state),
  rounds: expectedRoundsSelector(state),
  makers: makerSourceSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    changePlayers: changePlayersAction,
    init: initSettingsAction,
    showToast: showToastAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

interface IMutateNameDialogProps {
  open: boolean
  onRequestClose(): void
}

interface IMutateNameDialogState {
  chosenMaker: string
}

export class MutateNameDialogImpl extends React.Component {
  public props: IMutateNameDialogProps & stateType & dispatchType & ITranslateMixin
  public state: IMutateNameDialogState = {
    chosenMaker: ''
  }

  public render() {
    const {makers, open, rounds, t} = this.props
    const {chosenMaker} = this.state
    const actions = [
      <FlatButton
        label={t('Cancel')}
        primary={true}
        onClick={this.reject}
      />,
      <FlatButton
        label={t('Submit')}
        disabled={chosenMaker === ''}
        primary={true}
        onClick={this.confirm}
      />,
    ]
    return <Dialog
      title={t('Choose the maker for this round')}
      actions={actions}
      onRequestClose={this.reject}
      open={open}>
      <Dropdown label={t('Maker')} value={chosenMaker} source={makers} onChange={this.makerChanged} />
      <div>{t('Expected rounds: {{rounds}}', {rounds})}</div>
    </Dialog>
  }

  private makerChanged = (ID: string) => {
    this.setState(() => ({
      chosenMaker: ID
    }))
  }

  private confirm = () => {
    const maker = this.state.chosenMaker
    const {names, rounds, changePlayers} = this.props
    changePlayers(names, maker, rounds)

    // Reset setting state after a tick
    window.setTimeout(() => {
      const {init, currentGame, showToast, onRequestClose, t} = this.props
      init(currentGame)
      onRequestClose()
      showToast(t('Player name changed!'))
    }, 0)
  }

  private reject = () => {
    this.props.onRequestClose()
  }
}

export const MutateNameDialog = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(MutateNameDialogImpl) as React.ComponentType<IMutateNameDialogProps>
