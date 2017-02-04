import {inject, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = LogManager.getLogger('GameStackInputComponent');

@inject(GameService, EventAggregator)
export class StackInput {
  bidDisabled: boolean;
  winDisabled: boolean;

  constructor(private _gameService: GameService, private _ea: EventAggregator) {
    this._ea.subscribe('gameService.stateChanged', this.stateChanged.bind(this));
    this.stateChanged(); // Invoke for the first time to set initial states
  }

  stateChanged() {
    this.bidDisabled = this._gameService.state !== GameState.BID;
    this.winDisabled = this._gameService.state !== GameState.WIN;
  }

  next() {

  }

  undo() {

  }
}
