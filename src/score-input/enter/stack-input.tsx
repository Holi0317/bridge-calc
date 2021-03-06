import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import Typography from '@material-ui/core/Typography'
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
import {IRootState, ITranslateMixin, Dispatch} from '../../types'
import classes from './stack-input.pcss'

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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({setBid: setBidAction, setWin: setWinAction}, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type StackInputProps = stateType & dispatchType & ITranslateMixin

export class StackInputImpl extends React.Component {
  public props: StackInputProps

  public render() {
    const {t, bidDisabled, winDisabled, playerOrder, names, bid, win, error, bidStackInput, winStackInput} = this.props

    return (
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead className={classes.head}>
          <tr>
            <th/>
            {playerOrder.map(playerID => (
              <Typography component="th" key={playerID}>{names[playerID]}</Typography>
            ))}
          </tr>
          </thead>
          <tbody className={classes.body}>

          <tr>
            <Typography component="td">{t('Bid')}</Typography>
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
            <Typography component="td">{t('Win')}</Typography>
            {playerOrder.map(playerID => (
              <td key={playerID}>
                <Dropdown value={win[playerID] == null ? '' : win[playerID]} source={winStackInput[playerID]}
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
