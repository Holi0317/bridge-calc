// @flow
import {Enter} from './enter'
import {Scoreboard} from './scoreboard'
import {Settings} from './settings'

export type Route = {
  path: string,
  exact?: boolean,
  strict?: boolean,
  name: string,
  component: any
}

export const routes: Route[] = [{
  path: '/game',
  exact: true,
  name: 'Input',
  component: Enter
}, {
  path: '/game/scoreboard',
  name: 'Scoreboard',
  component: Scoreboard
}, {
  path: '/game/settings',
  name: 'Settings',
  component: Settings
}]
