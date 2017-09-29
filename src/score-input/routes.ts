import * as React from 'react'
import Loadable from 'react-loadable'
import {CurrentGameTitle} from './current-game-title'
import {titleAugment} from '../shell/title-augment'
import {Loading} from '../lazy-views/loading'

export interface IRoute {
  path: string
  exact?: boolean
  strict?: boolean
  name: string
  component: React.ComponentType<any>
  titleComponent: React.ComponentType<any>
}

export const routes: IRoute[] = [{
  path: '/score-input',
  exact: true,
  name: 'Input',
  component: Loadable({
    loader: () =>
      import('./enter' /* webpackChunkName: "score-input-enter-view" */)
        .then(mod => mod.Enter),
    loading: Loading
  }),
  titleComponent: CurrentGameTitle
}, {
  path: '/score-input/scoreboard',
  name: 'Scoreboard',
  component: Loadable({
    loader: () =>
      import('./scoreboard' /* webpackChunkName: "score-input-scoreboard-view" */)
        .then(mod => mod.Scoreboard),
    loading: Loading
  }),
  titleComponent: titleAugment('Scoreboard')
}, {
  path: '/score-input/settings',
  name: 'Settings',
  component: Loadable({
    loader: () =>
      import('./settings' /* webpackChunkName: "score-input-settings-view" */)
        .then(mod => mod.Settings),
    loading: Loading
  }),
  titleComponent: titleAugment('Settings')
}]
