import {ISerialized} from './interfaces';
import {GameBoard} from '../services/game-board/game-board';

/**
 * Dump and load gameService, playerManagerService and gameMetaService data to plain object
 * for persistent storage.
 */
export class Serializer {
  static dump(gameBoard: GameBoard): ISerialized {
    const playerManager = gameBoard.playerManager;
    const metaManager = gameBoard.metaManager;
    const timerService = gameBoard.timer;

    const game = {
      state: gameBoard.state,
      currentGameIndex: metaManager.currentGame ? metaManager.prevGames.length : null
    };

    return {
      game,
      players: playerManager.dump(),
      metas: metaManager.dump(),
      timer: timerService.dump()
    }
  }

  static load(data: ISerialized): GameBoard {
    const gameBoard = new GameBoard();

    gameBoard.state = data.game.state;
    gameBoard.playerManager.load(data.players);
    gameBoard.metaManager.load(data.metas, data.game.currentGameIndex);
    gameBoard.timer.load(data.timer);

    return gameBoard;
  }
}
