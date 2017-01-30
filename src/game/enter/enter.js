import {inject, LogManager} from 'aurelia-framework';
import {GameService} from '../../services/game-service';

const logger = LogManager.getLogger('game.inputComponent');

@inject(GameService)
export class GameEnter {
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  bid() {

  }
}
