import {inject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {GameService} from '../../services/game-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LayoutService} from '../../services/layout-service';

const logger = getLogger('game.inputComponent');

@inject(EventAggregator, LayoutService, GameService)
export class Enter {
  private _attached = false;

  constructor(private _ea: EventAggregator, private _layout: LayoutService, private _gameService: GameService) {
    this._ea.subscribe('gameService.stateChanged', this.stateChanged.bind(this));
  }

  attached() {
    this._attached = true;
    this.stateChanged();
  }

  detached() {
    this._attached = false;
  }

  stateChanged() {
    // Because event aggregator does not have unsubscribe :(
    if (this._attached) {
      const currentGame = this._gameService.currentGame;
      if (currentGame == null) {
        this._layout.title = '';
      } else if (currentGame.isExtra) {
        this._layout.title = currentGame.name;
      } else {
        const length = this._gameService.futureGames.length;
        this._layout.title = `Round ${currentGame.name} of ${length}`;
      }
    }
  }

  bid() {

  }
}
