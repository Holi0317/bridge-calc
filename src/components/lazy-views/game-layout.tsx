import * as React from 'react'
import Loadable from 'react-loadable'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {Loading} from './loading'
import {IRootState} from '../../types'
import {Redirect} from 'react-router'

const importer = () =>
  import ('../game/layout' /* webpackChunkName: "game-layout-view" */)
    .then(mod => mod.Layout)

export const Content = Loadable({
  loader: importer,
  loading: Loading
})

const mapStateToProps = (state: IRootState) => ({
  gameRedirect: state.currentGame == null
})

const stateType = returntypeof(mapStateToProps)
type LayoutProps = typeof stateType

function LayoutImpl({gameRedirect}: LayoutProps) {
  return gameRedirect ? <Redirect to="/entry" /> : <Content />
}

export const Layout = connect(mapStateToProps)(LayoutImpl as any)
