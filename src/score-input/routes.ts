import Loadable from 'react-loadable'
import {CurrentGameTitle} from './current-game-title'
import {Loading} from '../lazy-views/loading'
import {IRoute} from '../app/routes'
import {titleAugment} from '../app/title-augment'

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
  title: CurrentGameTitle
}, {
  path: '/score-input/scoreboard',
  name: 'Scoreboard',
  component: Loadable({
    loader: () =>
      import('./scoreboard' /* webpackChunkName: "score-input-scoreboard-view" */)
        .then(mod => mod.Scoreboard),
    loading: Loading
  }),
  title: titleAugment('Scoreboard')
}, {
  path: '/score-input/settings',
  name: 'Settings',
  component: Loadable({
    loader: () =>
      import('./settings' /* webpackChunkName: "score-input-settings-view" */)
        .then(mod => mod.Settings),
    loading: Loading
  }),
  title: titleAugment('Settings')
}]
