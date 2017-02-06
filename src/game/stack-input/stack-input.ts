import {inject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameService} from '../../services/game-service';
import {GameState} from '../../services/game-state';
import {Player} from '../../services/player-manager-service';

const logger = getLogger('GameStackInputComponent');

@inject(GameService, EventAggregator)
export class StackInput {
  bidDisabled: boolean;
  winDisabled: boolean;
  players: Player[];

  constructor(private _gameService: GameService, private _ea: EventAggregator) {
    this._ea.subscribe('gameService.stateChanged', this.stateChanged.bind(this));
    this.stateChanged(); // Invoke for the first time to set initial states
  }

  stateChanged() {
    this.bidDisabled = this._gameService.state !== GameState.BID;
    this.winDisabled = this._gameService.state !== GameState.WIN;
    const currentGame = this._gameService.currentGame;
    if (currentGame) {
      this.players = currentGame.playerOrder.map(id => this._gameService.playerManager.getPlayerByID(id));
    }
  }
}
