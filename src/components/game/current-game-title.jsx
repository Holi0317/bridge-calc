// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {gameTitleSelector} from '../../selectors/game-title'
import style from '../titles.css'

function DisconnectedCurrentGameTitle({title}) {
  return <h1 className={style.title}>{title}</h1>
}

function mapStateToProps(state, {t}) {
  return {
    title: gameTitleSelector(state, t)
  }
}

export const CurrentGameTitle = translate()(connect(mapStateToProps)(DisconnectedCurrentGameTitle))
