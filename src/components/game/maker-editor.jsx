// @flow
import {h, Component} from 'preact'
import {translate} from 'react-i18next'
import {connect} from 'preact-redux'
import Button from 'preact-material-components/Button/Button'
import {CHANGE_PLAYERS} from '../../actions/current-game'
import {namesSelector} from '../../selectors/current-game/names'
import {roundsSelector} from '../../selectors/current-game/rounds'
import {makerSelector} from '../../selectors/ui/settings/maker'
import {Snackbar} from '../mdc/snackbar'
import {MakerChooser} from './maker-chooser'
import style from './maker-editor.css'

import type {Dispatch, IPlayerMap, RootState, I18nT} from '../../types'
import type {IChangePlayersAction} from '../../actions/current-game'

class DisconnectMakerEditor extends Component {
  props: {
    names: IPlayerMap<string>,
    rounds: number,
    maker: string,

    commit: (names: IPlayerMap<string>, rounds: number, maker: string) => void,
    t: I18nT
  }
  state: {
    snackbarOpen: boolean
  }

  constructor() {
    super(...arguments)
    this.state = {
      snackbarOpen: false
    }
  }

  commit = () => {
    const {names, rounds, maker, commit} = this.props
    commit(names, rounds, maker)
    this.setState(() => ({
      snackbarOpen: true
    }))
  }

  snackbarClosed = () => {
    this.setState(() => ({
      snackbarOpen: false
    }))
  }

  render() {
    const {t} = this.props
    const {snackbarOpen} = this.state

    return (
      <div>
        <h4>{t('Change maker')}</h4>
        <MakerChooser />
        <Button raised accent className={style.btn} onClick={this.commit}>{t('Change maker')}</Button>
        <Snackbar open={snackbarOpen} message={t('Maker changed!')} onClosed={this.snackbarClosed} />
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
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

export const MakerEditor = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectMakerEditor))
