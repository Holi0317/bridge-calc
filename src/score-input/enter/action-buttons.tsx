import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {$call} from 'utility-types'
import RaisedButton from 'material-ui/RaisedButton'
import {GameStage} from '../game-stage'
import {stageSelector} from '../selectors/stage'
import {isStackInputValid} from './stack-input-validator'
import {bidAction} from '../actions/bid'
import {winAction} from '../actions/win'
import {undoAction} from '../actions/undo'
import {IRootState, ITranslateMixin} from '../../types'
import style from './action-buttons.css'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  undoDisabled: stageSelector(state) !== GameStage.waitingWin,
  nextDisabled: !isStackInputValid(state, t),
  currentGame: state.currentGame
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({bid: bidAction, win: winAction, undo: undoAction}, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

type ActionButtonsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export class ActionButtonsImpl extends React.Component {
  public props: ActionButtonsProps

  public render() {
    const {currentGame, undo, nextDisabled, t, undoDisabled} = this.props
    const undoHandler = currentGame == null
      ? undefined  // Material-ui needs this to be undefined instead of null
      : undo
    return (
      <div className={style.btnContainer}>
        <RaisedButton primary={true} disabled={nextDisabled} onClick={this.next}>{t('Next')}</RaisedButton>
        <div className={style.stretch}/>
        <RaisedButton disabled={undoDisabled} onClick={undoHandler}>{t('Undo')}</RaisedButton>
      </div>
    )
  }

  private next = () => {
    const {currentGame, bid, win} = this.props
    if (!currentGame) {
      // Just to eliminate state is null case
    } else if (currentGame.stage === GameStage.waitingBid) {
      bid(currentGame.bid)
    } else if (currentGame.stage === GameStage.waitingWin) {
      win(currentGame.win)
    }
  }
}

export const ActionButtons = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ActionButtonsImpl)
