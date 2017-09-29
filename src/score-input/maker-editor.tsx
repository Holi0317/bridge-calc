import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {RaisedButton} from 'material-ui/RaisedButton'
import {Snackbar} from 'material-ui/Snackbar'
import {CHANGE_PLAYERS, IChangePlayersAction} from '../actions/current-game'
import {namesSelector} from '../selectors/current-game/names'
import {roundsSelector} from '../selectors/current-game/rounds'
import {makerSelector} from '../selectors/ui/settings/maker'
import {MakerChooser} from './maker-chooser'
import {Dispatch, IPlayerMap, IRootState, ITranslateMixin} from '../types'
import style from './maker-editor.css'

const mapStateToProps = (state: IRootState) => ({
  names: namesSelector(state),
  rounds: roundsSelector(state),
  maker: makerSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commit(names: IPlayerMap<string>, rounds: number, maker: string) {
    const action: IChangePlayersAction = {
      type: CHANGE_PLAYERS,
      newNames: names,
      maker,
      rounds
    }
    dispatch(action)
  }
})

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
    const {names, rounds, maker, commit} = this.props
    commit(names, rounds!, maker!)
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
