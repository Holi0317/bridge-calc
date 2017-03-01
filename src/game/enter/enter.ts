import {autoinject, computedFrom} from 'aurelia-framework';
import bind from 'autobind-decorator'
import {getLogger} from 'aurelia-logging';
import {LayoutService} from '../../services/layout-service';
import {GameState} from '../../services/game-board/game-state';
import {BidValidator} from '../../validators/bid';
import {WinValidator} from '../../validators/win';
import {fill} from '../../utils';
import {Player} from '../../services/game-board/player';
import {GameMetaManagerEvents} from '../../services/game-board/game-meta-manager';
import {
  GameBoardManager, CurrentGameChangedParam,
  GameBoardManagerEvents
} from '../../services/game-board/game-board-manager';
import {Router} from 'aurelia-router';
import {GameBoardEvents} from '../../services/game-board/game-board';

const logger = getLogger('game.inputComponent');

@autoinject()
export class Enter {
  private _attached = false;
  bidError: {[playerID: string ]: string};
  winError: {[playerID: string ]: string};

  constructor(
    private _layout: LayoutService,
    private _gameBoardManager: GameBoardManager,
    private _bidValidator: BidValidator,
    private _winValidator: WinValidator,
    private _router: Router
  ) {
    this._gameBoardManager.on(GameBoardManagerEvents.CurrentGameChanged, this._currentGameChanged);
  }

  activate() {
    const gameBoard = this._gameBoardManager.currentGame;
    if (gameBoard && gameBoard.state === GameState.GAME_END) {
      this.toScoreboard();
      return
    }
    this._attached = true;
    this._metaChanged();
  }

  deactivate() {
    this._attached = false;
  }

  @computedFrom('_gameBoardManager.currentGame.state')
  get bidDisabled(): boolean {
    const gameBoard = this._gameBoardManager.currentGame;
    if (gameBoard) {
      return gameBoard.state !== GameState.BID;
    } else {
      return false
    }
  }

  @computedFrom('_gameBoardManager.currentGame.state')
  get winDisabled(): boolean {
    const gameBoard = this._gameBoardManager.currentGame;
    if (gameBoard) {
      return gameBoard.state !== GameState.WIN;
    } else {
      return true
    }
  }

  @computedFrom('_gameBoardManager.currentGame.metaManager.currentGame.playerOrder')
  get players(): Player[] {
    const gameBoard = this._gameBoardManager.currentGame;
    if (gameBoard) {
      const playerManager = gameBoard.playerManager;
      const meta = gameBoard.metaManager.currentGame;
      if (meta) {
        return meta.playerOrder.map(id => playerManager.getPlayerByID(id));
      }
    }

    return [];
  }

  /**
   * Handler function when reference to current game has changed.
   * @private
   */
  @bind
  private _currentGameChanged(opt: CurrentGameChangedParam) {
    const newValue = opt.newValue;
    if (newValue) {
      // Attach event listener to new game board.
      newValue.metaManager.on(GameMetaManagerEvents.CurrentGameChanged, this._metaChanged);
      newValue.on(GameBoardEvents.End, this.toScoreboard);

      // Invoke for the first time to set up initial data.
      this._metaChanged();
    }
  }

  /**
   * Callback when metadata has changed.
   * Change title of displayed page through LayoutService.
   */
  @bind
  private _metaChanged() {
    // Changing when not activated is not desirable
    const gameBoard = this._gameBoardManager.currentGame;
    if (this._attached && gameBoard) {
      // Set title
      const meta = gameBoard.metaManager.currentGame;

      if (!meta) {
        // No game is available.
        logger.warn('No game is available when enter route is activated');
        this._layout.title = '';
      } else if (meta.isExtra) {
        // Extra round
        this._layout.title = meta.name;
      } else {
        // Normal game
        const length = gameBoard.metaManager.getAllMetas().length;
        this._layout.title = `Round ${meta.name} of ${length}`;
      }
    }
  }

  /**
   * Proceed to next step of game.
   * I.E. bid trick -> win trick
   * Validate data then submit to GameBoard for it to set game states.
   */
  next() {
    // Check for correct state.
    const gameBoard = this._gameBoardManager.currentGame;
    if (!gameBoard) {
      logger.warn('[next] Current game is undefined.');
      return;
    }

    const state = gameBoard.state;
    const meta = gameBoard.metaManager.currentGame!;
    const players = gameBoard.playerManager.players;
    const scoreboards = players.map(p => p.scoreboard);

    // TODO clean up this mess
    if (state === GameState.BID) {
      fill(scoreboards, 'bid', '0');
      const lastPlayerID = meta.playerOrder[meta.playerOrder.length - 1];

      const res = this._bidValidator.validate({
        players,
        cardPerPlayer: meta.cardPerPlayer!,
        lastPlayerID
      });
      logger.debug('Bid validate result:', res);
      this.bidError = res.err;
      if (res.ok) {
        gameBoard.bid();
      }
    } else if (state === GameState.WIN) {
      // state === GameState.WIN
      fill(scoreboards, 'win', '0');
      const res = this._winValidator.validate({
        players,
        cardPerPlayer: meta.cardPerPlayer!
      });
      logger.debug('Win validate result:', res);
      this.winError = res.err;
      if (res.ok) {
        gameBoard.win();
      }
    } else {
      logger.warn('[next] GameService state is not correct.');
    }

  }

  /**
   * Rollback from win trick state to bid trick state.
   */
  revert() {
    const currentGame = this._gameBoardManager.currentGame;
    if (currentGame && currentGame.state === GameState.WIN) {
      currentGame.revert();
    }
  }

  /**
   * Redirect to scoreboard view
   */
  @bind
  toScoreboard() {
    this._router.navigateToRoute('scoreboard');
  }

}
