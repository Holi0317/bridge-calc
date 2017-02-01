import {inject, computedFrom, LogManager} from 'aurelia-framework';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = LogManager.getLogger('GameStackInputComponent');

@inject(GameService)
export class StackInput {
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  attached() {
    logger.debug('Attached');
  }

  @computedFrom('gameService.state')
  get bidDisabled() {
    return this.gameService.state !== GameState.BID;
  }

  @computedFrom('gameService.state')
  get winDisabled() {
    return this.gameService.state !== GameState.WIN;
  }

  next() {

  }

  undo() {

  }
}
