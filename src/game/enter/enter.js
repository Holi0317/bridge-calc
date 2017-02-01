import {inject, LogManager, computedFrom} from 'aurelia-framework';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = LogManager.getLogger('game.inputComponent');

@inject(GameService)
export class Enter {
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  @computedFrom('gameService.state')
  get showBid() {
    return this.gameService.state === GameState.BID;
  }
  set showBid(val) {

  }

  @computedFrom('gameService.state')
  get showWin() {
    return this.gameService.state === GameState.WIN;
  }
  set showWin(val) {

  }

  bid() {

  }
}
