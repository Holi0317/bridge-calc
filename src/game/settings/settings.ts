import {autoinject} from 'aurelia-dependency-injection'
import {computedFrom} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'
import {GameBoardManager} from '../../services/game-board/game-board-manager'
import {GameState} from '../../services/game-board/game-state'
import {Player} from '../../services/game-board/player'
import {LayoutService} from '../../services/layout-service'
import {SnackbarService} from '../../services/snackbar-service'

const logger = getLogger('SettingsComponent')

@autoinject
export class GameSettings {
  public players: Player[] = []
  public extraCards: string

  constructor(
    private _layoutService: LayoutService,
    private _gameBoardManager: GameBoardManager,
    private _snackbar: SnackbarService
  ) {

  }

  @computedFrom('_gameBoardManager.currentGame.state')
  get skipDisabled() {
    const currentGame = this._gameBoardManager.currentGame!
    return currentGame.state === GameState.GAME_END
  }

  @computedFrom('_gameBoardManager.currentGame.metaManager.futureGames.length')
  get skipToLastDisabled() {
    const currentGame = this._gameBoardManager.currentGame!
    const metaManager = currentGame.metaManager
    return metaManager.futureGames.length === 0
  }

  public attached() {
    this._layoutService.title = 'Settings'
    const currentGame = this._gameBoardManager.currentGame!
    this.players = currentGame.playerManager.players
  }

  /**
   * Mutate player list in playerManager according to players variable stored locally
   */
  public editPlayer() {
    // Validate
    if (this.players.length === 0) {
      this._snackbar.showSnackbar('Error: All player is removed')
      return
    }
    const currentGame = this._gameBoardManager.currentGame!
    currentGame.playerManager.changePlayerList(this.players)
    this._snackbar.showSnackbar('Player list updated')
  }

  public skip() {
    this._gameBoardManager.currentGame!.skip()
    this._snackbar.showSnackbar('Skipped 1 round')
  }

  public skipToLast() {
    const currentGame = this._gameBoardManager.currentGame!
    const skips = currentGame.metaManager.futureGames.length - 1
    logger.debug(`Going to skip ${skips} rounds`)
    for (let i = 0; i <= skips; i++) {
      currentGame.skip()
    }
    this._snackbar.showSnackbar('Skipped to the last round')
  }

  public extraRound() {
    if (!this.extraCards) {
      this._snackbar.showSnackbar('Please input number of card')
      return
    }
    const cards = +this.extraCards
    if (!Number.isInteger(cards) || cards <= 0) {
      this._snackbar.showSnackbar('Number of cards must be a positive integer')
      return
    }
    const currentGame = this._gameBoardManager.currentGame!
    currentGame.metaManager.addRound(cards)
    this.extraCards = ''
    this._snackbar.showSnackbar('Added an extra round.')
  }
}
