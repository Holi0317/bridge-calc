import {GameBoard} from '../services/game-board/game-board'
import {ISerialized} from './interfaces'

/**
 * Dump and load gameService, playerManagerService and gameMetaService data to plain object
 * for persistent storage.
 */
export class Serializer {
  public static dump(gameBoard: GameBoard): ISerialized {
    const playerManager = gameBoard.playerManager
    const metaManager = gameBoard.metaManager
    const timerService = gameBoard.timer

    const game = {
      state: gameBoard.state,
    }

    return {
      game,
      metas: metaManager.dump(),
      players: playerManager.dump(),
      timer: timerService.dump(),
    }
  }

  public static load(data: ISerialized): GameBoard {
    const gameBoard = new GameBoard()

    gameBoard.state = data.game.state
    gameBoard.playerManager.load(data.players)
    gameBoard.metaManager.load(data.metas)
    gameBoard.timer.load(data.timer)

    return gameBoard
  }
}
