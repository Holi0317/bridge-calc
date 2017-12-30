import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {Dropdown} from '../../material/dropdown'
import {GameStage} from '../game-stage'
import {stageSelector} from '../selectors/stage'
import {namesSelector} from '../selectors/names'
import {bidSelector} from '../selectors/bid'
import {winSelector} from '../selectors/win'
import {playerOrderSelector} from '../selectors/player-order'
import {stackInputValidatorWithProps} from './stack-input-validator'
import {bidStackInputSourceSelector} from '../selectors/bid-stack-input-source'
import {winStackInputSourceSelector} from '../selectors/win-stack-input-source'
import {setBidAction} from '../actions/set-bid'
import {setWinAction} from '../actions/set-win'
import {IRootState, ITranslateMixin} from '../../types'
import style from './stack-input.css'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  bidDisabled: stageSelector(state) !== GameStage.waitingBid,
  winDisabled: stageSelector(state) !== GameStage.waitingWin,
  playerOrder: playerOrderSelector(state),
  bid: bidSelector(state),
  win: winSelector(state),
  names: namesSelector(state),
  error: stackInputValidatorWithProps(state, t),
  bidStackInput: bidStackInputSourceSelector(state),
  winStackInput: winStackInputSourceSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({setBid: setBidAction, setWin: setWinAction}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type StackInputProps = typeof stateType & typeof dispatchType & ITranslateMixin

export class StackInputImpl extends React.Component {
  public props: StackInputProps

  public render() {
    const {t, bidDisabled, winDisabled, playerOrder, names, bid, win, error, bidStackInput, winStackInput} = this.props
    return (
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead className={style.head}>
          <tr>
            <th/>
            {playerOrder.map(playerID => (
              <th key={playerID}>{names[playerID]}</th>
            ))}
          </tr>
          </thead>
          <tbody className={style.body}>

          <tr>
            <td>{t('Bid')}</td>
            {playerOrder.map(playerID => (
              <td key={playerID}>
                <Dropdown value={bid[playerID]} source={bidStackInput[playerID]}
                          label={t('Bid for {{name}}', {name: names[playerID]})}
                          disabled={bidDisabled} error={error.bid[playerID]}
                          onChange={this.setBid(playerID)}/>
              </td>
            ))}
          </tr>

          <tr>
            <td>{t('Win')}</td>
            {playerOrder.map(playerID => (
              <td key={playerID}>
                <Dropdown value={win[playerID]} source={winStackInput[playerID]}
                          label={t('Win for {{name}}', {name: names[playerID]})}
                          disabled={winDisabled} error={error.win[playerID]}
                          onChange={this.setWin(playerID)}/>
              </td>
            ))}
          </tr>

          </tbody>
        </table>
      </div>
    )
  }

  private setBid = (playerID: string) => {
    return (value: number) => {
      const {bid, setBid} = this.props
      setBid({
        ...bid,
        [playerID]: value
      })
    }
  }

  private setWin = (playerID: string) => {
    return (value: number) => {
      const {win, setWin} = this.props
      setWin({
        ...win,
        [playerID]: value
      })
    }
  }
}

export const StackInput = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(StackInputImpl)
