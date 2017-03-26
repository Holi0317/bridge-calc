import {GameBoard} from '../services/game-board/game-board'
import {GameMetaManager} from '../services/game-board/game-meta-manager'
import {PlayerManager} from '../services/game-board/player-manager'
import {Timer} from '../services/game-board/timer'
import'../services/game-board/timer'
import {ISerialized} from './schema'

/**
 * Dump and load gameService, playerManagerService and gameMetaService data to plain object
 * for persistent storage.
 */
export class Serializer {
  public static dump(gameBoard: GameBoard): ISerialized {
    const playerManager = gameBoard.playerManager
    const metaManager = gameBoard.metaManager
    const timerService = gameBoard.timer

    return {
      gameBoard: gameBoard.dump(),
      metas: metaManager.dump(),
      players: playerManager.dump(),
      timer: timerService.dump()
    }
  }

  public static load(data: ISerialized): GameBoard {
    const gameBoard = GameBoard.fromDumped(data.gameBoard)

    gameBoard.playerManager = PlayerManager.fromDumped(data.players)
    gameBoard.metaManager = GameMetaManager.fromDumped(gameBoard.playerManager, data.metas)
    gameBoard.timer = Timer.fromDumped(data.timer)

    return gameBoard
  }
}
