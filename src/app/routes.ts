import * as React from 'react'
import {RouteProps} from 'react-router'
import {Menu, Entry, Layout} from '../lazy-views'
import {GameTitle} from '../score-input/title'

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
  path: '/score-input',
  name: 'score-input',
  component: Layout,
  title: GameTitle
}]
