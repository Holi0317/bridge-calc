import * as React from 'react'
import {CurrentGameTitle} from './current-game-title'
import {createTitle} from '../create-title'
import {lazyHOC} from '../lazy-views/lazy-hoc'

export interface IRoute {
  path: string
  exact?: boolean
  strict?: boolean
  name: string
  component: React.ComponentType<any>
  titleComponent: React.ComponentType<any>
}

export const routes: IRoute[] = [{
  path: '/game',
  exact: true,
  name: 'Input',
  component: lazyHOC(() =>
    import('./enter' /* webpackChunkName: "game-enter-view" */)
      .then(mod => mod.Enter)),
  titleComponent: CurrentGameTitle
}, {
  path: '/game/scoreboard',
  name: 'Scoreboard',
  component: lazyHOC(() =>
    import('./scoreboard' /* webpackChunkName: "game-scoreboard-view" */)
      .then(mod => mod.Scoreboard)),
  titleComponent: createTitle('Scoreboard')
}, {
  path: '/game/settings',
  name: 'Settings',
  component: lazyHOC(() =>
    import('./settings' /* webpackChunkName: "game-settings-view" */)
      .then(mod => mod.Settings)),
  titleComponent: createTitle('Settings')
}]
