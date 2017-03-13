import {autoinject} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'
import {GameBoardManager} from '../../services/game-board/game-board-manager'
import {LayoutService} from '../../services/layout-service'

const logger = getLogger('GameScoreboardView')

@autoinject()
export class GameScoreboard {

  constructor(
    private _layoutService: LayoutService,
    private _gameBoardManager: GameBoardManager,
  ) {

  }

  public activate() {
    this._layoutService.title = 'Scoreboard'
  }

}
