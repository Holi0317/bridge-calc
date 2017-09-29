import * as React from 'react'
import {RouteProps} from 'react-router'
import {Menu, Entry, Layout} from '../lazy-views'
import {GameTitle} from '../components/game/title'

export interface IRoute extends RouteProps {
  title: string | React.ComponentType<any>
  name: string
}

export const routes: IRoute[] = [{
  path: '/',
  name: 'root',
  component: Menu,
  exact: true,
  title: 'Bridge calculator'
}, {
  path: '/entry',
  name: 'entry',
  component: Entry,
  title: 'Entry'
}, {
  path: '/game',
  name: 'game',
  component: Layout,
  title: GameTitle
}]
