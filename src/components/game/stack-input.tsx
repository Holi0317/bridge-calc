import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {Dropdown} from '../material/dropdown'
import {GameStage} from '../../game-stage'
import {stageSelector} from '../../selectors/current-game/stage'
import {namesSelector} from '../../selectors/current-game/names'
import {bidSelector} from '../../selectors/current-game/bid'
import {winSelector} from '../../selectors/current-game/win'
import {playerOrderSelector} from '../../selectors/current-game/player-order'
import {withErrorProp} from '../../selectors/validators/stack-input-validator'
import {SET_BID, SET_WIN} from '../../actions/current-game'
import {bidStackInputSourceSelector} from '../../selectors/current-game/bid-stack-input-source'
import {winStackInputSourceSelector} from '../../selectors/current-game/win-stack-input-source'
import {IPlayerMap, IRootState, ITranslateMixin, Dispatch} from '../../types'
import style from './stack-input.css'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  bidDisabled: stageSelector(state) !== GameStage.waitingBid,
  winDisabled: stageSelector(state) !== GameStage.waitingWin,
  playerOrder: playerOrderSelector(state),
  bid: bidSelector(state),
  win: winSelector(state),
  names: namesSelector(state),
  error: withErrorProp(state, t),
  bidStackInput: bidStackInputSourceSelector(state),
  winStackInput: winStackInputSourceSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  disp(action: any, playerID: string, oldMap: IPlayerMap<number>) {
    return (value: number) => {
      const payload = {
        ...oldMap,
        [playerID]: value
      }
      dispatch({type: action, payload})

    }
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type StackInputProps = typeof stateType & typeof dispatchType & ITranslateMixin

function StackInputImpl({t, bidDisabled, winDisabled, playerOrder, names, bid, win, error, bidStackInput, winStackInput, disp}: StackInputProps) {
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead className={style.head}>
          <tr>
            <th />
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
                  onChange={disp(SET_BID, playerID, bid)} />
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
                  onChange={disp(SET_WIN, playerID, win)} />
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export const StackInput = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(StackInputImpl)
