// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import mapValues from 'lodash.mapvalues'
import {NumberInput} from '../number-input'
import {last} from '../../utils'
import {stackInputValidator} from '../../validators/stack-input'
import {isInteger} from '../../validators/entry-options'
import {gameStage} from '../../game-stage'
import {SET_BID, SET_WIN} from '../../actions/current-game'
import style from './stack-input.css'

import type {T, PlayerMap} from '../../types'

type StackInputProps = {
  t: T,
  bidDisabled: boolean,
  winDisabled: boolean,
  names: PlayerMap<string>,
  bid: PlayerMap<string>,
  win: PlayerMap<string>,
  error: {
    bid: PlayerMap<string>,
    win: PlayerMap<string>
  },

  disp: (action: string, playerID: string, oldValue: PlayerMap<string>) => () => void
}

function DisconnectStackInput({t, bidDisabled, winDisabled, names, bid, win, error, disp}: StackInputProps) {
  return (
    <div>
      <div className={style.inputContainer}>
        <span>{t('Bid')}</span>
        {Object.entries(names).map(([playerID, name]) => (
          <NumberInput className={style.input} label={name} autocomplete="off" disabled={bidDisabled}
                 value={bid[playerID]} error={error.bid[playerID]}
                 onChange={disp(SET_BID, playerID, bid)} />
        ))}
      </div>
      <div className={style.inputContainer}>
        <span>{t('Win')}</span>
        {Object.entries(names).map(([playerID, name]) => (
          <NumberInput className={style.input} label={name} autocomplete="off" disabled={winDisabled}
                 value={win[playerID]} error={error.win[playerID]}
                 onChange={disp(SET_WIN, playerID, win)} />
        ))}
      </div>
    </div>
  )
}

function mapToString(map: PlayerMap<number>): PlayerMap<string> {
  return mapValues(map, value => value + '')
}

function mapToNum(map: PlayerMap<string>): PlayerMap<number> {
  return mapValues(map, value => +value)
}

function mapStateToProps(state: any, {t}) {  // Marking this as RootState only make things too complicated
  const currentGame = state.currentGame
  if (currentGame === null || currentGame.stage === gameStage.ended) {
    return {
      bidDisabled: true,
      winDisabled: true,
      bid: {},
      win: {},
      names: {},
      error: {
        bid: {},
        win: {}
      }
    }
  }
  const lastPlayerID = last(currentGame.currentPlayerOrder)
  const opts = {
    ...currentGame,
    lastPlayerID: lastPlayerID ? lastPlayerID : ''
  }
  return {
    bidDisabled: currentGame.stage !== gameStage.waitingBid,
    winDisabled: currentGame.stage !== gameStage.waitingWin,
    bid: mapToString(currentGame.bid),
    win: mapToString(currentGame.win),
    names: currentGame.names || {},
    error: {
      bid: {},
      win: {},
      ...stackInputValidator(opts, t)
    }
  }
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
