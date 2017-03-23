import {autoinject} from 'aurelia-framework'
import {Router, RouterConfiguration} from 'aurelia-router'
import {GameBoardManager} from '../services/game-board/game-board-manager'

@autoinject()
export class Game {
  private _router: Router

  constructor(private _gameBoardManager: GameBoardManager) {

  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = ''
    config.map([
      { route: '', name: 'enter', moduleId: './enter/enter', nav: true, title: 'Input' },
      { route: '/scoreboard', name: 'scoreboard', moduleId: './scoreboard/scoreboard', nav: true, title: 'Scoreboard' },
      { route: '/settings', name: 'settings', moduleId: './settings/settings', nav: true, title: 'Settings' }
    ])

    this._router = router
  }

  public activate() {
    if (!this._gameBoardManager.currentGame) {
      this._router.parent.navigate('/')
    }
  }
}
