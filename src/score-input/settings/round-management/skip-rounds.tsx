import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import FlatButton from 'material-ui/FlatButton'
import {IRootState, ITranslateMixin} from '../../../types'
import {skipAction} from '../../actions/skip'
import {remainingRoundsSelector} from '../../selectors/remaining-rounds'
import {currentRoundSelector} from '../../selectors/current-round'
import styles from './skip-rounds.css'
import {initSettingsAction} from '../actions/init-settings'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  currentRound: currentRoundSelector(state),
  remainingRounds: remainingRoundsSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    skip: skipAction,
    init: initSettingsAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

interface ISkipRoundsProps {
  requestToast: (round: number | null) => void
}

export class SkipRoundsImpl extends React.Component {
  public props: ISkipRoundsProps & typeof stateType & typeof dispatchType & ITranslateMixin

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
      const {skip} = this.props
      skip(n)

      window.setTimeout(() => {
        const {init, currentGame, currentRound, requestToast} = this.props
        init(currentGame)
        requestToast(currentRound)
      }, 0)
    }
  }
}

export const SkipRounds = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(SkipRoundsImpl) as React.ComponentType<ISkipRoundsProps>
