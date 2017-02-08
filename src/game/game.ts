import {autoinject} from 'aurelia-framework';
import {GameService} from '../services/game-service';
import {GameState} from '../services/game-state';
import {RouterConfiguration, Router} from 'aurelia-router';

@autoinject()
export class Game {
  private _router: Router;

  constructor(private _gameService: GameService) {

  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = '';
    config.map([
      { route: '', name: 'enter', moduleId: './enter/enter', nav: true, title: 'Input' },
      { route: '/scoreboard', name: 'scoreboard', moduleId: './scoreboard/scoreboard', nav: true, title: 'Scoreboard' },
      { route: '/settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings' }
    ]);

    this._router = router;
  }

  activate() {
    if (this._gameService.state === GameState.NOT_STARTED) {
      this._router.parent.navigate('/');
    }
  }
}
