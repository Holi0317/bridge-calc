import * as React from 'react'
import {RouteProps} from 'react-router'
import {MenuView, EntryView, ScoreInputView} from '../lazy-views'
import {GameTitle} from '../score-input/title'

export interface IRoute extends RouteProps {
  title: string | React.ComponentType<any>
  name: string
}

export const routes: IRoute[] = [{
  path: '/',
  name: 'root',
  component: MenuView,
  exact: true,
  title: 'Bridge calculator'
}, {
  path: '/entry',
  name: 'entry',
  component: EntryView,
  title: 'Entry'
}, {
  path: '/score-input',
  name: 'score-input',
  component: ScoreInputView,
  title: GameTitle
}]
