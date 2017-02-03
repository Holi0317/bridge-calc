import {inject, computedFrom, LogManager} from 'aurelia-framework';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = LogManager.getLogger('GameStackInputComponent');

@inject(GameService)
export class StackInput {
  constructor(private _gameService: GameService) {

  }

  @computedFrom('_gameService.state')
  get bidDisabled() {
    return this._gameService.state !== GameState.BID;
  }

  @computedFrom('_gameService.state')
  get winDisabled() {
    return this._gameService.state !== GameState.WIN;
  }

  next() {

  }

  undo() {

  }
}
