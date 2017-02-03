import {inject, LogManager, computedFrom} from 'aurelia-framework';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = LogManager.getLogger('game.inputComponent');

@inject(GameService)
export class Enter {
  constructor(private _gameService: GameService) {

  }

  @computedFrom('_gameService.state')
  get showBid() {
    return this._gameService.state === GameState.BID;
  }
  set showBid(val) {

  }

  @computedFrom('_gameService.state')
  get showWin() {
    return this._gameService.state === GameState.WIN;
  }
  set showWin(val) {

  }

  bid() {

  }
}
