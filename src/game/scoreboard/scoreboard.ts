import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {GameService} from '../../services/game-service';
import {GameMetaManager} from '../../services/game-board/game-meta-manager';
import {PlayerManager} from '../../services/game-board/player-manager';
import {LayoutService} from '../../services/layout-service';

const logger = getLogger('GameScoreboardView');

@autoinject()
export class GameScoreboard {

  constructor(
    private _gameService: GameService,
    private _playerManager: PlayerManager,
    private _gameMetaManager: GameMetaManager,
    private _layoutService: LayoutService
  ) {

  }

  activate() {
    this._layoutService.title = 'Scoreboard';
  }

}
