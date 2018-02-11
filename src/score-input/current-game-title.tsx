import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {gameTitleSelector} from './selectors/game-title'
import {$call, IRootState, ITranslateMixin} from '../types'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  title: gameTitleSelector(state, t)
})

const stateType = $call(mapStateToProps)

type CurrentGameTitleProps = typeof stateType

export function CurrentGameTitleImpl({title}: CurrentGameTitleProps) {
  return <span>{title}</span>
}

export const CurrentGameTitle = flowRight(
  translate(),
  connect(mapStateToProps)
)(CurrentGameTitleImpl)
