import {inject, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = LogManager.getLogger('ActionButtonComponent');

@inject(GameService, EventAggregator)
export class ActionButtons {
  undoDisabled: boolean;

  constructor(private _gameService: GameService, private _ea: EventAggregator) {
    this._ea.subscribe('gameService.stateChanged', this.stateChanged.bind(this));
    this.stateChanged(); // Invoke for the first time to set initial states
  }

  stateChanged() {
    this.undoDisabled = this._gameService.state !== GameState.WIN;
  }

  next() {

  }

  undo() {
    if (this.undoDisabled) {
      logger.warn('Undo method is triggered while undo should be disabled')
    } else {
      this._gameService.revert();
    }
  }
}
