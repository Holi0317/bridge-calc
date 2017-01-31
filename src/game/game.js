import {inject} from 'aurelia-framework';
import {GameService} from '../services/game-service';
import {GameState} from '../services/game-state';

import type {RouterConfiguration, Router} from 'aurelia-router';

@inject(GameService)
export class Game {
  router: Router;
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = '';
    config.map([
      { route: '', name: 'enter', moduleId: './enter/enter', nav: true, title: 'Input' },
      { route: '/scoreboard', name: 'scoreboard', moduleId: './scoreboard/scoreboard', nav: true, title: 'Scoreboard' },
      { route: '/settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings' }
    ]);

    this.router = router;
  }

  activate() {
    if (this.gameService.state === GameState.NOT_STARTED) {
      this.router.parent.navigate('/');
    }
  }
}
