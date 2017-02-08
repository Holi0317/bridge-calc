import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {GameService} from '../../services/game-service';
import {GameMetaService} from '../../services/game-meta-service';
import {PlayerManagerService} from '../../services/player-manager-service';
import {LayoutService} from '../../services/layout-service';

const logger = getLogger('GameScoreboardView');

@autoinject()
export class GameScoreboard {

  constructor(
    private _gameService: GameService,
    private _playerManager: PlayerManagerService,
    private _gameMetaService: GameMetaService,
    private _layoutService: LayoutService
  ) {

  }

  activate() {
    this._layoutService.title = 'Scoreboard';
  }

}
