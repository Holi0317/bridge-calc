import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {Container} from 'react-grid-system'
import {NoPrevGamePlaceholder} from './no-prev-game-placeholder'
import {havePrevGamesSelector} from './selectors/have-prev-games'
import {PrevGameEntry} from './types'
import {PrevGame} from './prev-game'
import {IRootState} from '../types'
import {deleteGameAction} from './actions/delete-game'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import styles from './prev-games.css'
import {reversedPrevGamesSelector} from './selectors/reversed-prev-games'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  havePrevGame: havePrevGamesSelector(state),
  prevGames: reversedPrevGamesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    del: deleteGameAction,
    load: replaceCurrentGameAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class PrevGamesImpl extends React.Component {
  public props: stateType & dispatchType & RouteComponentProps<any>

  public render() {
    const {havePrevGame, prevGames} = this.props
    if (havePrevGame) {
      return (
        <Container>
          {prevGames.map((prevGame: PrevGameEntry, index: number) => (
            <PrevGame key={`prev-game-${index}`} className={styles.prevGame} game={prevGame}
                      requestDelete={() => this.del(index)} requestContinue={() => this.load(prevGame)}/>
          ))}
        </Container>
      )
    }

    return <NoPrevGamePlaceholder/>
  }

  private del = (reversedIndex: number) => {
    const {prevGames, del, currentGame, load} = this.props
    const index = prevGames.length - reversedIndex - 1
    const entry = prevGames[reversedIndex]
    if (currentGame && currentGame.id === entry.id) {
      load(null)
    }
    del(index)
  }

  private load(prevGame: PrevGameEntry) {
    const {load, history} = this.props
    load(prevGame)
    history.push('/score-input')
  }
}

export const PrevGames = flowRight(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PrevGamesImpl)
