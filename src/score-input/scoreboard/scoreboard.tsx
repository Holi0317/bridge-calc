import * as React from 'react'
import {connect} from 'react-redux'
import {Container} from '../../material/container'
import {ScoreboardTable} from './scoreboard-table'
import {IRootState} from '../../types'
import classes from './scoreboard.pcss'

const mapStateToProps = (state: IRootState) => ({
  entry: state.currentGame
})

type stateType = ReturnType<typeof mapStateToProps>

export function ScoreboardImpl({entry}: stateType) {
  return (
    <Container>
      {entry && (
        <div className={classes.scoreboardContainer}>
          <ScoreboardTable entry={entry} mini={false} />
        </div>
      )}
    </Container>
  )
}

export const Scoreboard = connect(mapStateToProps)(ScoreboardImpl)
