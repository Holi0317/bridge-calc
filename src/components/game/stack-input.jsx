// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import mapValues from 'lodash/mapValues'
import {NumberInput} from '../number-input'
import {isInteger} from '../../validators/entry-options'
import {GameStage} from '../../game-stage'
import {stageSelector} from '../../selectors/stage'
import {namesSelector} from '../../selectors/names'
import {strBidSelector} from '../../selectors/bid'
import {strWinSelector} from '../../selectors/win'
import {playerOrderSelector} from '../../selectors/player-order'
import {withErrorProp} from '../../selectors/stack-input-validator'
import {SET_BID, SET_WIN} from '../../actions/current-game'
import style from './stack-input.css'

import type {T, PlayerMap, RootState} from '../../types'

type StackInputProps = {
  t: T,
  bidDisabled: boolean,
  winDisabled: boolean,
  playerOrder: string[],
  names: PlayerMap<string>,
  bid: PlayerMap<string>,
  win: PlayerMap<string>,
  error: {
    bid: PlayerMap<string>,
    win: PlayerMap<string>
  },

  disp: (action: string, playerID: string, oldValue: PlayerMap<string>) => () => void
}

function DisconnectStackInput({t, bidDisabled, winDisabled, playerOrder, names, bid, win, error, disp}: StackInputProps) {
  return (
    <div>
      <div className={style.inputContainer}>
        <span>{t('Bid')}</span>
        {playerOrder.map(playerID => (
          <NumberInput className={style.input} label={names[playerID]} autocomplete="off" disabled={bidDisabled}
                 key={playerID} value={bid[playerID]} error={error.bid[playerID]}
                 onChange={disp(SET_BID, playerID, bid)} />
        ))}
      </div>
      <div className={style.inputContainer}>
        <span>{t('Win')}</span>
        {playerOrder.map(playerID => (
          <NumberInput className={style.input} label={names[playerID]} autocomplete="off" disabled={winDisabled}
                 key={playerID} value={win[playerID]} error={error.win[playerID]}
                 onChange={disp(SET_WIN, playerID, win)} />
        ))}
      </div>
    </div>
  )
}

function mapStateToProps(state: RootState, {t}) {
  return {
    bidDisabled: stageSelector(state) !== GameStage.waitingBid,
    winDisabled: stageSelector(state) !== GameStage.waitingWin,
    playerOrder: playerOrderSelector(state),
    bid: strBidSelector(state),
    win: strWinSelector(state),
    names: namesSelector(state),
    error: withErrorProp(state, t)
  }
}

function mapToNum(map: PlayerMap<string>): PlayerMap<number> {
  return mapValues(map, value => +value)
}

function mapDispatchToProps(dispatch) {
  return {
    disp(action, playerID: string, oldValue: PlayerMap<string>) {
      return (value: string, valid: boolean) => {
        const payload = {
          ...mapToNum(oldValue)
        }

        if (valid && value === '') {
          delete payload[playerID]
        } else {
          const newValue = (valid && isInteger(value)) || !isInteger(oldValue[playerID] || 'e')
            ? +value
            : +oldValue[playerID]
          payload[playerID] = newValue
        }

        dispatch({type: action, payload})

      }
    }
  }
}

export const StackInput = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectStackInput))
