import * as React from 'react'
import {Redirect, Route} from 'react-router'
import {Menu, Entry, Layout} from '../lazy-views'
import {IRootState} from '../../types'
import {returntypeof} from 'react-redux-typescript'
import {connect} from 'react-redux'

const mapStateToProps = (state: IRootState) => ({
  gameRedirect: state.currentGame == null
})

const stateType = returntypeof(mapStateToProps)

type RootRoutesProps = typeof stateType

function RootRoutesImpl({gameRedirect}: RootRoutesProps) {
  return [
    <Route exact path="/" component={Menu} />,
    <Route path="/entry" component={Entry} />,
    <Route path="/game" render={() => (
      gameRedirect ? <Redirect to="/entry" /> : <Layout />
    )} />
  ]
}

export const RootRoutes = connect(mapStateToProps)(RootRoutesImpl as any)
