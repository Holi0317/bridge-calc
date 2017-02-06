import {inject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {GameService} from '../../services/game-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LayoutService} from '../../services/layout-service';
import {GameState} from '../../services/game-state';
import {Player} from '../../services/player-manager-service';
import {BidValidator} from '../../validators/bid';
import {WinValidator} from '../../validators/win';
import {fill} from '../../utils';

const logger = getLogger('game.inputComponent');

@inject(EventAggregator, LayoutService, GameService, BidValidator, WinValidator)
export class Enter {
  private _attached = false;
  bidDisabled: boolean;
  winDisabled: boolean;
  bidError: {[playerID: string ]: string};
  winError: {[playerID: string ]: string};
  players: Player[];

  constructor(
    private _ea: EventAggregator,
    private _layout: LayoutService,
    private _gameService: GameService,
    private _bidValidator: BidValidator,
    private _winValidator: WinValidator
  ) {
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
      // Set title
      const currentGame = this._gameService.currentGame;
      if (currentGame == null) {
        this._layout.title = '';
      } else if (currentGame.isExtra) {
        this._layout.title = currentGame.name;
      } else {
        const length = this._gameService.futureGames.length + this._gameService.prevGames.length + 1;
        this._layout.title = `Round ${currentGame.name} of ${length}`;
      }

      // Set states
      this.bidDisabled = this._gameService.state !== GameState.BID;
      this.winDisabled = this._gameService.state !== GameState.WIN;
      if (currentGame) {
        this.players = currentGame.playerOrder.map(id => this._gameService.playerManager.getPlayerByID(id));
      }
    }
  }

  next() {
    // Check valid
    const state = this._gameService.state;
    if (state !== GameState.BID && state !== GameState.WIN) {
      logger.warn('GameService state is not correct when calling next().');
      return;
    }

    const currentGame = this._gameService.currentGame!;
    const scoreboards = this._gameService.playerManager.players.map(p => p.scoreboard);

    if (state === GameState.BID) {
      fill(scoreboards, 'bid', '0');
      const res = this._bidValidator.validate({
        players: this._gameService.playerManager.players,
        cardPerPlayer: currentGame.cardPerPlayer!,
        lastPlayerID: currentGame.playerOrder[currentGame.playerOrder.length - 1]!
      });
      logger.debug('Bid validate result:', res);
      this.bidError = res.err;
      if (res.ok) {
        this._gameService.bid();
      }
    } else {
      // state === GameState.WIN
      fill(scoreboards, 'win', '0');
      const res = this._winValidator.validate({
        players: this._gameService.playerManager.players,
        cardPerPlayer: currentGame.cardPerPlayer!
      });
      logger.debug('Win validate result:', res);
      this.winError = res.err;
      if (res.ok) {
        this._gameService.win();
      }
    }

  }

  revert() {
    this._gameService.revert();
  }

}
