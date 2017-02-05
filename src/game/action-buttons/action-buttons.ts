import {inject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';

const logger = getLogger('ActionButtonComponent');

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
      // We use delegate to bind event. Event will still be triggered even when the button is disabled.
      return
    } else {
      this._gameService.revert();
    }
  }
}
