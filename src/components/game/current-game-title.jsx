// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {gameStage} from '../../game-stage'
import style from '../titles.css'

import type {GameState} from '../../reducer/current-game'
import type {T} from '../../types'

function DisconnectedCurrentGameTitle({title}) {
  return <h1 className={style.title}>{title}</h1>
}

function computeTitle(currentGame: GameState, t: T): string {
  if (currentGame == null) {
    return ''
  } else if (currentGame.stage === gameStage.waitingBid || currentGame.stage === gameStage.waitingWin) {
    const {currentRound, rounds} = (currentGame: any)  // If not type cast this, flow will throw error
    return t('Round {{currentRound}} of {{rounds}}', {currentRound, rounds})
  } else if (currentGame.stage === gameStage.ended) {
    return t('Game over')
  } else {
    return ''
  }
}

function mapStateToProps(state, {t}) {
  return {
    title: computeTitle(state.currentGame, t)
  }
}

export const CurrentGameTitle = translate()(connect(mapStateToProps)(DisconnectedCurrentGameTitle))
