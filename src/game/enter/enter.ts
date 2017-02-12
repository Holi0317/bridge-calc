import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {GameService} from '../../services/game-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LayoutService} from '../../services/layout-service';
import {GameState} from '../../services/game-state';
import {PlayerManager} from '../../services/player-manager';
import {BidValidator} from '../../validators/bid';
import {WinValidator} from '../../validators/win';
import {fill} from '../../utils';
import {Player} from '../../services/player';
import {GameMetaManager} from '../../services/game-meta-manager';

const logger = getLogger('game.inputComponent');

@autoinject()
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
    private _gameMetaManager: GameMetaManager,
    private _playerManager: PlayerManager,
    private _bidValidator: BidValidator,
    private _winValidator: WinValidator
  ) {
    this._ea.subscribe('gameMetaManager.currentGameChanged', this.metaChanged.bind(this));
    this._ea.subscribe('gameService.stateChanged', this.stateChanged.bind(this));
    this._ea.subscribe('gameMetaManager.playerOrderChanged', this.playerOrderChanged.bind(this));
    this.stateChanged();
    this.metaChanged();
    this.playerOrderChanged();
  }

  attached() {
    this._attached = true;
    this.metaChanged();
  }

  detached() {
    this._attached = false;
  }

  metaChanged() {
    // Because event aggregator does not have unsubscribe :(
    if (this._attached) {
      // Set title
      const currentGame = this._gameMetaManager.currentGame;
      if (currentGame == null) {
        // No game is available
        this._layout.title = '';
      } else if (currentGame.isExtra) {
        // Extra round
        this._layout.title = currentGame.name;
      } else {
        // Normal game
        const length = this._gameMetaManager.getAllMetas().length;
        this._layout.title = `Round ${currentGame.name} of ${length}`;
      }
    }
  }

  stateChanged() {
    // Set states
    this.bidDisabled = this._gameService.state !== GameState.BID;
    this.winDisabled = this._gameService.state !== GameState.WIN;

  }

  playerOrderChanged() {
    const currentGame = this._gameMetaManager.currentGame;
    if (currentGame) {
      this.players = currentGame.playerOrder.map(id => this._playerManager.getPlayerByID(id));
    }
  }

  next() {
    // TODO Clean up this mess
    // Check valid
    const state = this._gameService.state;
    if (state !== GameState.BID && state !== GameState.WIN) {
      logger.warn('GameService state is not correct when calling next().');
      return;
    }

    const currentGame = this._gameMetaManager.currentGame!;
    const scoreboards = this._playerManager.players.map(p => p.scoreboard);

    if (state === GameState.BID) {
      fill(scoreboards, 'bid', '0');
      const res = this._bidValidator.validate({
        players: this._playerManager.players,
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
        players: this._playerManager.players,
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
