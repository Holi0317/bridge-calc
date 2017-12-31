import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown} from '../../../material/dropdown'
import {makerSourceSelector} from '../selectors/maker-source'
import {namesSelector} from '../selectors/names'
import {changePlayersAction} from '../../actions/change-players'
import {initSettingsAction} from '../actions/init-settings'
import {IRootState, ITranslateMixin} from '../../../types'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  names: namesSelector(state),
  // TODO Implement selector for calculating expected rounds
  rounds: 13,
  makers: makerSourceSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    changePlayers: changePlayersAction,
    init: initSettingsAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

interface IMutateNameDialogProps {
  open: boolean,
  onRequestClose: () => void
}

interface IMutateNameDialogState {
  chosenMaker: string
}

export class MutateNameDialogImpl extends React.Component {
  public props: IMutateNameDialogProps & typeof stateType & typeof dispatchType & ITranslateMixin
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
      const {init, currentGame, onRequestClose} = this.props
      init(currentGame)
      onRequestClose()
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
