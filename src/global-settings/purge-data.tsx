import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {translate} from 'react-i18next'
import {connect, Dispatch} from 'react-redux'
import {$call} from 'utility-types'
import RaisedButton from 'material-ui/RaisedButton'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import {resetGamesAtion} from '../prev-games/actions/reset-games'
import {showToastAction} from '../toast-singleton/actions/show-toast'
import {ITranslateMixin} from '../types'

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    setCurrentGame: replaceCurrentGameAction,
    resetPrevGames: resetGamesAtion,
    showToast: showToastAction
  }, dispatch)

const dispatchType = $call(mapDispatchToProps)

type PurgeDataProps = typeof dispatchType & ITranslateMixin

export class PurgeDataImpl extends React.Component {
  public props: PurgeDataProps

  public render() {
    const {t} = this.props
    return (
      <div>
        <RaisedButton label={t('Clear all data')} primary={true} onClick={this.clear} />
      </div>
    )
  }

  private clear = () => {
    const {showToast, t, setCurrentGame, resetPrevGames} = this.props
    setCurrentGame(null)
    resetPrevGames()
    showToast(t('All data is cleared'))
  }
}

export const PurgeData = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(PurgeDataImpl)
