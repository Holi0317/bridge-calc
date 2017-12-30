// FIXME Remove this module on production
import * as React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {returntypeof} from 'react-redux-typescript'
import {bindActionCreators, Dispatch} from 'redux'
import {addGameAction} from './actions/add-game'
import {connect} from 'react-redux'
import {GameStage} from '../score-input/game-stage'
import {IPlayerMap} from '../types'
import {IWaitingBidState} from '../score-input/reducer/types'

function genMap<T>(a: T, b: T, c: T, d: T): IPlayerMap<T> {
  return {a, b, c, d}
}

const data: IWaitingBidState = {
  id: 'testing',
  rounds: 13,
  startTime: new Date(0),
  names: genMap('John', 'Mary', 'Henry', 'Joe'),
  scores: genMap([], [], [], []),
  stage: GameStage.waitingBid,
  currentPlayerOrder: ['a', 'b', 'c', 'd'],
  currentRound: 1,
  bid: genMap(0, 0, 0, 0)
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({addGame: addGameAction}, dispatch)

const dispatchType = returntypeof(mapDispatchToProps)

type DevAddGameProps = typeof dispatchType

function DevAddGameImpl({addGame}: DevAddGameProps) {
  return <FlatButton label="[Dev] Add previous game" onClick={() => addGame(data)} />
}

export const DevAddGame = connect(null, mapDispatchToProps)(DevAddGameImpl)
