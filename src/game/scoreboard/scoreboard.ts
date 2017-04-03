import {autoinject} from 'aurelia-framework'
import {GameBoardManager} from '../../services/game-board/game-board-manager'
import {LayoutService} from '../../services/layout-service'

@autoinject()
export class GameScoreboard {

  constructor(
    private _layoutService: LayoutService,
    private _gameBoardManager: GameBoardManager
  ) {

  }

  public activate() {
    this._layoutService.title = 'Scoreboard'
  }

}
