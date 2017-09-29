import * as React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {gameTitleSelector} from '../../selectors/current-game/game-title'
import {IRootState, ITranslateMixin} from '../../types'
import {returntypeof} from 'react-redux-typescript'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  title: gameTitleSelector(state, t)
})

const stateType = returntypeof(mapStateToProps)

type CurrentGameTitleProps = typeof stateType

export function CurrentGameTitleImpl({title}: CurrentGameTitleProps) {
  return <span>{title}</span>
}

export const CurrentGameTitle = translate()(connect(mapStateToProps)(CurrentGameTitleImpl))
