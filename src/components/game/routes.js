// @flow
import {Enter} from './enter'
import {Scoreboard} from './scoreboard'
import {Settings} from './settings'
import {CurrentGameTitle} from './current-game-title'
import {createTitle} from '../create-title'

export type Route = {
  path: string,
  exact?: boolean,
  strict?: boolean,
  name: string,
  component: ReactClass<*>,
  titleComponent: ReactClass<*>
}

export const routes: Route[] = [{
  path: '/game',
  exact: true,
  name: 'Input',
  component: Enter,
  titleComponent: CurrentGameTitle
}, {
  path: '/game/scoreboard',
  name: 'Scoreboard',
  component: Scoreboard,
  titleComponent: createTitle('Scoreboard')
}, {
  path: '/game/settings',
  name: 'Settings',
  component: Settings,
  titleComponent: createTitle('Settings')
}]
