import * as React from 'react'
import Loadable from 'react-loadable'
import {connect} from 'react-redux'
import {Loading} from './loading'
import {$call, IRootState} from '../types'
import {Redirect} from 'react-router'

const importer = () =>
  import('../score-input/layout' /* webpackChunkName: "score-input-view" */)
    .then(mod => mod.Layout)

export const Content = Loadable({
  loader: importer,
  loading: Loading
})

const mapStateToProps = (state: IRootState) => ({
  gameRedirect: state.currentGame == null
})

const stateType = $call(mapStateToProps)
type LayoutProps = typeof stateType

export function LayoutImpl({gameRedirect}: LayoutProps) {
  return gameRedirect ? <Redirect to="/entry" /> : <Content />
}

export const ScoreInputView = connect(mapStateToProps)(LayoutImpl)
