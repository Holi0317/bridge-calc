// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {Dropdown} from '../mdc/dropdown'
import {GameStage} from '../../game-stage'
import {stageSelector} from '../../selectors/stage'
import {namesSelector} from '../../selectors/names'
import {bidSelector} from '../../selectors/bid'
import {winSelector} from '../../selectors/win'
import {playerOrderSelector} from '../../selectors/player-order'
import {withErrorProp} from '../../selectors/stack-input-validator'
import {SET_BID, SET_WIN} from '../../actions/current-game'
import {bidStackInputSourceSelector} from '../../selectors/bid-stack-input-source'
import {winStackInputSourceSelector} from '../../selectors/win-stack-input-source'
import style from './stack-input.css'

import type {T, PlayerMap, RootState, DropdownSource} from '../../types'

type StackInputProps = {
  t: T,

  bidDisabled: boolean,
  winDisabled: boolean,
  playerOrder: string[],
  names: PlayerMap<string>,
  bid: PlayerMap<number>,
  win: PlayerMap<number>,
  error: {
    bid: PlayerMap<string>,
    win: PlayerMap<string>
  },
  bidStackInput: PlayerMap<DropdownSource<number>[]>,
  winStackInput: PlayerMap<DropdownSource<number>[]>,

  disp: (action: string, playerID: string, oldValue: PlayerMap<string>) => () => void
}

function DisconnectStackInput({t, bidDisabled, winDisabled, playerOrder, names, bid, win, error, bidStackInput, winStackInput, disp}: StackInputProps) {
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
        <tr className={style.row}>
          <th />
          {playerOrder.map(playerID => (
            <th key={playerID} className={style.playerName}>{names[playerID]}</th>
          ))}
        </tr>
        </thead>
        <tbody>

        <tr className={style.row}>
          <td className={style.caption}>{t('Bid')}</td>
          {playerOrder.map(playerID => (
            <td key={playerID}>
              <Dropdown className={style.dropdown} value={bid[playerID]} source={bidStackInput[playerID]}
                        label={t('Bid for {{name}}', {name: names[playerID]})}
                        disabled={bidDisabled}
                        onChange={disp(SET_BID, playerID, bid)} />
            </td>
          ))}
        </tr>

        <tr className={style.row}>
          <td className={style.caption}>{t('Win')}</td>
          {playerOrder.map(playerID => (
            <td key={playerID}>
              <Dropdown className={style.dropdown} value={win[playerID]} source={winStackInput[playerID]}
                        label={t('Win for {{name}}', {name: names[playerID]})}
                        disabled={winDisabled}
                        onChange={disp(SET_WIN, playerID, win)} />
            </td>
          ))}
        </tr>

        </tbody>
      </table>
    </div>
  )
}

function mapStateToProps(state: RootState, {t}) {
  return {
    bidDisabled: stageSelector(state) !== GameStage.waitingBid,
    winDisabled: stageSelector(state) !== GameStage.waitingWin,
    playerOrder: playerOrderSelector(state),
    bid: bidSelector(state),
    win: winSelector(state),
    names: namesSelector(state),
    error: withErrorProp(state, t),
    bidStackInput: bidStackInputSourceSelector(state),
    winStackInput: winStackInputSourceSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    disp(action, playerID: string, oldMap: PlayerMap<string>) {
      return (value: number) => {
        const payload = {
          ...oldMap,
          [playerID]: value
        }
        dispatch({type: action, payload})

      }
    }
  }
}

export const StackInput = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectStackInput))
