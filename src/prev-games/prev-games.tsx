import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Grid} from 'react-flexbox-grid'
import {NoPrevGamePlaceholder} from './no-prev-game-placeholder'
import {IPrevGameEntry} from './types'
import {PrevGameEntry} from './prev-game-entry'
import {IRootState, ITranslateMixin} from '../types'

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
    <Grid>
      {prevGames.map((prevGame: IPrevGameEntry) => (
        <PrevGameEntry key={prevGame.id} {...prevGame} />
      ))}
    </Grid>
  )
}

export const PrevGames = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PrevGamesImpl)
