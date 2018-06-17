import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {Container} from '../material/container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import {NoPrevGamePlaceholder} from './no-prev-game-placeholder'
import {PrevGame} from './prev-game'
import {ResetModal} from './reset-modal'
import {GameModal} from './game-modal'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import {deleteGameAction} from './actions/delete-game'
import {showGameModalAction} from './actions/game-modal'
import {havePrevGamesSelector} from './selectors/have-prev-games'
import {reversedPrevGamesSelector} from './selectors/reversed-prev-games'
import {IRootState, Dispatch, ITranslateMixin} from '../types'
import classes from './prev-games.pcss'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
  havePrevGame: havePrevGamesSelector(state),
  prevGames: reversedPrevGamesSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    del: deleteGameAction,
    show: showGameModalAction,
    load: replaceCurrentGameAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class PrevGamesImpl extends React.Component {
  public props: stateType & dispatchType & RouteComponentProps<any> & ITranslateMixin

  public render() {
    const {havePrevGame, prevGames, t} = this.props
    if (havePrevGame) {
      return (
        <Container>
          <div className={classes.prevGameContainer}>
            <Typography variant="display1" gutterBottom>{t('Click on an entry for details')}</Typography>
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
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PrevGamesImpl)
