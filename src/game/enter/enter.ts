import {autoinject, computedFrom} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'
import {Router} from 'aurelia-router'
import bind from 'autobind-decorator'
import {GameBoardEvents} from '../../services/game-board/game-board'
import {
  GameBoardManager, GameBoardManagerEvents,
  ICurrentGameChangedParam
} from '../../services/game-board/game-board-manager'
import {GameMetaManagerEvents} from '../../services/game-board/game-meta-manager'
import {GameState} from '../../services/game-board/game-state'
import {Player} from '../../services/game-board/player'
import {LayoutService} from '../../services/layout-service'
import {fill} from '../../utils'
import {bidValidator} from '../../validators/bid'
import {winValidator} from '../../validators/win'

const logger = getLogger('game.inputComponent')

@autoinject()
export class Enter {
  public bidError: {[playerID: string ]: string}
  public winError: {[playerID: string ]: string}

  constructor(
    private _layout: LayoutService,
    private _gameBoardManager: GameBoardManager,
    private _router: Router
  ) {
    this._gameBoardManager.on(GameBoardManagerEvents.CurrentGameChanged, this._currentGameChanged)
  }

  public activate() {
    const gameBoard = this._gameBoardManager.currentGame
    if (gameBoard && gameBoard.state === GameState.GAME_END) {
      this.toScoreboard()
      return
    }
    this._metaChanged()
  }

  @computedFrom('_gameBoardManager.currentGame.state')
  get bidDisabled(): boolean {
    const gameBoard = this._gameBoardManager.currentGame
    if (gameBoard) {
      return gameBoard.state !== GameState.BID
    } else {
      return false
    }
  }

  @computedFrom('_gameBoardManager.currentGame.state')
  get winDisabled(): boolean {
    const gameBoard = this._gameBoardManager.currentGame
    if (gameBoard) {
      return gameBoard.state !== GameState.WIN
    } else {
      return true
    }
  }

  @computedFrom('_gameBoardManager.currentGame.metaManager.currentGame.playerOrder')
  get players(): Player[] {
    const gameBoard = this._gameBoardManager.currentGame
    if (gameBoard && gameBoard.metaManager.currentGame) {
      const playerManager = gameBoard.playerManager
      return gameBoard.metaManager.currentGame.playerOrder.map((id) => playerManager.getPlayerByID(id))
    }

    return []
  }

  @computedFrom('_gameBoardManager.currentGame.metaManager.currentGame')
  get layoutTitle(): string {
    const gameBoard = this._gameBoardManager.currentGame
    if (gameBoard) {
      const meta = gameBoard.metaManager.currentGame
      if (!meta) {
        // No game is available.
        return ''
      } else if (meta.isExtra) {
        // Extra round
        return meta.name
      } else {
        // Normal game
        const length = gameBoard.metaManager.getAllMetas().length
        return `Round ${meta.name} of ${length}`
      }
    }
    return ''
  }

  /**
   * Proceed to next step of game.
   * I.E. bid trick -> win trick
   * Validate data then submit to GameBoard for it to set game states.
   */
  public next() {
    // Check for correct state.
    const gameBoard = this._gameBoardManager.currentGame
    if (!gameBoard) {
      logger.warn('[next] Current game is undefined.')
      return
    }

    const state = gameBoard.state
    const meta = gameBoard.metaManager.currentGame!
    const players = gameBoard.playerManager.players
    const scoreboards = players.map((p) => p.scoreboard)

    // TODO clean up this mess
    if (state === GameState.BID) {
      fill(scoreboards, 'bid', '0')
      const lastPlayerID = meta.playerOrder[meta.playerOrder.length - 1]

      const res = bidValidator({
        players,
        cardPerPlayer: meta.cardPerPlayer!,
        lastPlayerID
      })
      logger.debug('Bid validate result:', res)
      this.bidError = res.err
      if (res.ok) {
        gameBoard.bid()
      }
    } else if (state === GameState.WIN) {
      fill(scoreboards, 'win', '0')
      const res = winValidator({
        players,
        cardPerPlayer: meta.cardPerPlayer!
      })
      logger.debug('Win validate result:', res)
      this.winError = res.err
      if (res.ok) {
        gameBoard.win()
      }
    } else {
      logger.warn('[next] GameService state is not correct.')
    }

  }

  /**
   * Rollback from win trick state to bid trick state.
   */
  public revert() {
    const currentGame = this._gameBoardManager.currentGame
    if (currentGame && currentGame.state === GameState.WIN) {
      currentGame.revert()
    }
  }

  /**
   * Redirect to scoreboard view
   */
  @bind
  public toScoreboard() {
    this._router.navigateToRoute('scoreboard')
  }

  /**
   * Handler function when reference to current game has changed.
   * @private
   */
  @bind
  private _currentGameChanged(opt: ICurrentGameChangedParam) {
    const newValue = opt.newValue
    logger.debug('Current game changed. New game:', newValue)
    if (newValue) {
      // Attach event listener to new game board.
      newValue.metaManager.on(GameMetaManagerEvents.CurrentGameChanged, this._metaChanged)
      newValue.on(GameBoardEvents.End, this.toScoreboard)

      // Invoke for the first time to set up initial data.
      this._metaChanged()
    }
  }

  /**
   * Callback when metadata has changed.
   * Change title of displayed page through LayoutService.
   */
  @bind
  private _metaChanged() {
    // No attached checking here.
    // No idea why checking attachment would stop title assignment.
    // This seems to work as expected. Hopefully there is no leaky case.
    this._layout.title = this.layoutTitle
  }

}
