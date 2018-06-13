import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {Container} from 'react-grid-system'
import List from '@material-ui/core/List'
import {NoPrevGamePlaceholder} from './no-prev-game-placeholder'
import {havePrevGamesSelector} from './selectors/have-prev-games'
import {PrevGameEntry} from './types'
import {PrevGame} from './prev-game'
import {deleteGameAction} from './actions/delete-game'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import {reversedPrevGamesSelector} from './selectors/reversed-prev-games'
import {ResetModal} from './reset-modal'
import {GameModal} from './game-modal'
import {IRootState, Dispatch} from '../types'
import styles from './prev-games.css'
import {showGameModalFunction} from './actions/game-modal'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  havePrevGame: havePrevGamesSelector(state),
  prevGames: reversedPrevGamesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    del: deleteGameAction,
    show: showGameModalFunction,
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
          <div className={styles.prevGameContainer}>
            <List>
              {prevGames.map((prevGame, index) => (
                <PrevGame key={`prev-game-${index}`} game={prevGame}
                          requestDetail={this.makeDetails(index)} requestDelete={this.makeDel(index)} />
              ))}
            </List>
          </div>
          <GameModal />
          <ResetModal />
        </Container>
      )
    }

    return <NoPrevGamePlaceholder/>
  }

  private makeDel(reversedIndex: number) {
    return () => {
      const {prevGames, del, currentGame, load} = this.props
      const index = prevGames.length - reversedIndex - 1
      const entry = prevGames[reversedIndex]
      if (currentGame && currentGame.id === entry.id) {
        load(null)
      }
      del(index)
    }
  }

  private load(prevGame: PrevGameEntry) {
    const {load, history} = this.props
    load(prevGame)
    history.push('/score-input')
  }

  private makeDetails(reversedIndex: number) {
    return () => {
      const {prevGames, show} = this.props
      const index = prevGames.length - reversedIndex - 1
      show(index)
    }
  }
}

export const PrevGames = flowRight(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PrevGamesImpl)
