import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import {resetGamesAtion} from '../prev-games/actions/reset-games'
import {showToastAction} from '../toast-singleton/actions/show-toast'
import {ITranslateMixin, Dispatch} from '../types'

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    setCurrentGame: replaceCurrentGameAction,
    resetPrevGames: resetGamesAtion,
    showToast: showToastAction
  }, dispatch)

type dispatchType = ReturnType<typeof mapDispatchToProps>

type PurgeDataProps = dispatchType & ITranslateMixin

export class PurgeDataImpl extends React.Component {
  public props: PurgeDataProps

  public render() {
    const {t} = this.props
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.clear}>{t('Clear all data')}</Button>
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
