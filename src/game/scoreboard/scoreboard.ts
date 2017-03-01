import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {LayoutService} from '../../services/layout-service';
import {GameBoardManager} from '../../services/game-board/game-board-manager';

const logger = getLogger('GameScoreboardView');

@autoinject()
export class GameScoreboard {

  constructor(
    private _layoutService: LayoutService,
    private _gameBoardManager: GameBoardManager
  ) {

  }

  activate() {
    this._layoutService.title = 'Scoreboard';
  }

}
