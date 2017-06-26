// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {gameTitleSelector} from '../../selectors/current-game/game-title'

function DisconnectedCurrentGameTitle({title}) {
  return <span>{title}</span>
}

function mapStateToProps(state, {t}) {
  return {
    title: gameTitleSelector(state, t)
  }
}

export const CurrentGameTitle = translate()(connect(mapStateToProps)(DisconnectedCurrentGameTitle))
