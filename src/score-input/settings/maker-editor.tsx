import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import {namesSelector} from '../selectors/names'
import {roundsSelector} from '../selectors/rounds'
import {makerSelector} from './selectors/maker'
import {MakerChooser} from './maker-chooser'
import {changePlayersAction} from '../actions/change-players'
import {IRootState, ITranslateMixin} from '../../types'
import style from './maker-editor.css'

const mapStateToProps = (state: IRootState) => ({
  names: namesSelector(state),
  rounds: roundsSelector(state),
  maker: makerSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({changePlayers: changePlayersAction}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

export class MakerEditorImpl extends React.Component {
  public props: typeof stateType & typeof dispatchType & ITranslateMixin
  public state = {
    snackbarOpen: false
  }

  public render() {
    const {t} = this.props
    const {snackbarOpen} = this.state

    return (
      <div>
        <h4>{t('Change maker')}</h4>
        <MakerChooser />
        <RaisedButton primary={true} className={style.btn} onClick={this.commit}>{t('Change maker')}</RaisedButton>
        <Snackbar open={snackbarOpen} message={t('Maker changed!')} onRequestClose={this.snackbarClosed} />
      </div>
    )
  }

  private commit = () => {
    const {names, rounds, maker, changePlayers} = this.props
    changePlayers(names, maker!, rounds!)
    this.setState(() => ({
      snackbarOpen: true
    }))
  }

  private snackbarClosed = () => {
    this.setState(() => ({
      snackbarOpen: false
    }))
  }
}

export const MakerEditor = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(MakerEditorImpl)
