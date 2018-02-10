import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {$call} from 'utility-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import FlatButton from 'material-ui/FlatButton'
import {IRootState, ITranslateMixin} from '../../../types'
import {skipAction} from '../../actions/skip'
import {initSettingsAction} from '../actions/init-settings'
import {showToastAction} from '../../../toast-singleton/actions/show-toast'
import {remainingRoundsSelector} from '../../selectors/remaining-rounds'
import {currentRoundSelector} from '../../selectors/current-round'
import styles from './skip-rounds.css'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  currentRound: currentRoundSelector(state),
  remainingRounds: remainingRoundsSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    skip: skipAction,
    init: initSettingsAction,
    showToast: showToastAction
  }, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

export class SkipRoundsImpl extends React.Component {
  public props: typeof stateType & typeof dispatchType & ITranslateMixin

  public render() {
    const {remainingRounds, t} = this.props
    return (
      <div className={styles.btnContainer}>
        <FlatButton className={styles.btn} onClick={this.skip(1)} label={t('Skip this round')}/>
        <FlatButton className={styles.btn} onClick={this.skip(remainingRounds - 1)} label={t('Skip to last round')}/>
        <FlatButton className={styles.btn} onClick={this.skip(remainingRounds)} label={t('End game')}/>
      </div>
    )
  }

  private skip = (n: number) => {
    return () => {
      if (n <= 0) {
        const {showToast, t} = this.props
        showToast(t('Already at the last round. Cannot skip.'))
        return
      }

      const {remainingRounds, skip} = this.props
      const isEndGame = remainingRounds <= n
      skip(n)

      if (!isEndGame) {
        window.setTimeout(() => {
          const {init, currentGame, currentRound, showToast, t} = this.props
          init(currentGame)

          if (currentRound !== null) {
            const msg = t('Skipped round(s). You are now playing round {{round}}', {round: currentRound})
            showToast(msg)
          }

        }, 0)
      }
    }
  }
}

export const SkipRounds = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(SkipRoundsImpl)
