import type {RouterConfiguration, Router} from 'aurelia-router';

export class Game {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = '';
    config.map([
      { route: '', name: 'enter', moduleId: './enter/enter', nav: true, title: 'Input' },
      { route: '/scoreboard', name: 'scoreboard', moduleId: './scoreboard/scoreboard', nav: true, title: 'Scoreboard' },
      { route: '/settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings' }
    ]);

    this.router = router;
  }
}
