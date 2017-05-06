// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {Button} from 'react-toolbox/components/button'
import {GameStage} from '../../game-stage'
import {BID, SET_BID, SET_WIN, SKIP, WIN} from '../../actions/current-game'
import {stackInputValidator} from '../../validators/stack-input'
import {isOk, last, fill} from '../../utils'
import style from './action-buttons.css'

import type {Dispatch, PlayerMap, T} from '../../types'
import type {BID_ACTION, WIN_ACTION, SKIP_ACTION, SET_BID_ACTION, SET_WIN_ACTION} from '../../actions/current-game'
import type {GameState} from '../../reducer/current-game'

type ActionButtonsProps = {
  t: T,
  currentGame: GameState,
  nextDisabled: boolean,
  undoDisabled: boolean,
  next: (state: GameState) => () => void,
  undo: (stage: string) => () => void
}

function DisconnectActionButtons({t, nextDisabled, undoDisabled, currentGame, next, undo}: ActionButtonsProps) {
  const undoHandler = currentGame == null ? null : undo(currentGame.stage)
  return (
    <div className={style.btnContainer}>
      <Button label={t('Next')} accent raised disabled={nextDisabled} onMouseUp={next(currentGame)} />
      <div className={style.stretch} />
      <Button label={t('Undo')} raised disabled={undoDisabled} onMouseUp={undoHandler} />
    </div>
  )
}

function mapStateToProps(state: any, {t}) {
  const currentGame = state.currentGame
  if (!currentGame || currentGame.stage === GameStage.ended) {
    return {
      undoDisabled: true,
      nextDisabled: true,
      currentGame
    }
  }
  const lastPlayerID = last(currentGame.currentPlayerOrder)
  const opts = {
    ...currentGame,
    lastPlayerID: lastPlayerID ? lastPlayerID : ''
  }
  const ok = isOk(stackInputValidator(opts, t))
  return {
    undoDisabled: currentGame.stage !== GameStage.waitingWin,
    nextDisabled: !ok,
    currentGame
  }
}

type UpdaterOpts = {
  buffer: PlayerMap<number>,
  bufferName: 'bid' | 'win',
  names: PlayerMap<string>,
  currentRound: number,
  dispatch: Dispatch
}

/**
 * Handler function for next action
 */
function updater(opts: UpdaterOpts) {
  const playerIDs = Object.keys(opts.names)
  let buffer = opts.buffer

  // Check if 0 need to be filled
  if (Object.keys(opts.buffer).length !== playerIDs.length) {
    buffer = fill(opts.buffer, playerIDs, 0)
    if (opts.bufferName === 'bid') {
      const action: SET_BID_ACTION= {type: SET_BID, payload: buffer}
      opts.dispatch(action)
    } else if (opts.bufferName === 'win') {
      const action: SET_WIN_ACTION = {type: SET_WIN, payload: buffer}
      opts.dispatch(action)
    }

    const validateOpt = {
      [opts.bufferName]: buffer,
      currentRound: opts.currentRound,
      lastPlayerID: ''  // We do not care error message. Leave this as blank string will do
    }
    const valid = isOk(stackInputValidator(validateOpt, a => a))
    if (!valid) {
      // Invalid after changing the state. Refuse to proceed
      return
    }
  }

  if (opts.bufferName === 'bid') {
    const action: BID_ACTION = {type: BID, payload: buffer}
    opts.dispatch(action)
  } else if (opts.bufferName === 'win') {
    const action: WIN_ACTION = {type: WIN, payload: buffer, time: new Date()}
    opts.dispatch(action)
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    next(state: GameState) {
      return () => {

        if (!state) {
          // Just to eliminate state is null case
        } else if (state.stage === GameStage.waitingBid) {
          updater({
            dispatch,
            buffer: state.bid,
            bufferName: 'bid',
            names: state.names,
            currentRound: state.currentRound
          })
        } else if (state.stage === GameStage.waitingWin) {
          updater({
            dispatch,
            buffer: state.win,
            bufferName: 'win',
            names: state.names,
            currentRound: state.currentRound
          })
        }

      }
    },
    undo(stage: string) {
      return () => {
        if (stage === GameStage.waitingWin) {
          const action: SKIP_ACTION = {type: SKIP, time: new Date()}
          dispatch(action)
        }
      }
    }
  }
}

export const ActionButtons = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectActionButtons))
