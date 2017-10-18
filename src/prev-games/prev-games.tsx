import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {IRootState, ITranslateMixin} from '../types'
import grid from '../styles/grid.css'
import {NoPrevGamePlaceholder} from './no-prev-game-placeholder'
import {IPrevGameState} from './prev-games-reducer'
import {PrevGameEntry} from './prev-game-entry'

const mapStateToProps = (state: IRootState) => ({
  havePrevGame: true,
  prevGames: []
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type PrevGamesProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function PrevGamesImpl({havePrevGame, prevGames, t}: PrevGamesProps) {
  if (!havePrevGame) {
    return <NoPrevGamePlaceholder />
  }
  return (
    <div className={grid.container}>
      {prevGames.map((prevGame: IPrevGameState) => (
        <PrevGameEntry key={prevGame.id} {...prevGame} />
      ))}
    </div>
  )
}

export const PrevGames = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PrevGamesImpl)
