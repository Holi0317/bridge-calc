import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Container} from 'react-grid-system'
import {NoPrevGamePlaceholder} from './no-prev-game-placeholder'
import {havePrevGamesSelector} from './selectors/have-prev-games'
import {prevGamesSelector} from './selectors/prev-games'
import {PrevGameEntry} from './types'
import {PrevGame} from './prev-game'
import {IRootState, ITranslateMixin} from '../types'
import {lazyDeleteGameAction} from './actions/delete-game'
import {loadGameAction} from './actions/load-game'

const mapStateToProps = (state: IRootState) => ({
  havePrevGame: havePrevGamesSelector(state),
  prevGames: prevGamesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    del: lazyDeleteGameAction,
    load: loadGameAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type PrevGamesProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function PrevGamesImpl({havePrevGame, prevGames, del, load, t}: PrevGamesProps) {
  if (havePrevGame) {
    return (
      <Container>
        {prevGames.map((prevGame: PrevGameEntry, index: number) => (
          <PrevGame key={`prev-game-${index}`} game={prevGame}
                    requestDelete={del(index)} requestContinue={load(index, prevGame)} />
        ))}
      </Container>
    )
  }

  return <NoPrevGamePlaceholder/>
}

export const PrevGames = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PrevGamesImpl)
