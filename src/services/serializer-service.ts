import {lazy} from 'aurelia-framework';
import {GameService} from './game-service';
import {PlayerManager} from './player-manager';
import {GameMetaManager} from './game-meta-manager';
import {ISerialized} from '../storage/interfaces';

/**
 * Dump and load gameService, playerManagerService and gameMetaService data to plain object
 * for persistent storage.
 */
export class SerializerService {
  constructor(
    @lazy(GameService) private _gameService: () => GameService,
    @lazy(PlayerManager) private _playerManager: () => PlayerManager,
    @lazy(GameMetaManager) private _gameMetaManager: () => GameMetaManager
  ) {

  }

  dump(): ISerialized {
    const gameService = this._gameService();
    const playerManager = this._playerManager();
    const gameMetaManager = this._gameMetaManager();

    const game = {
      state: gameService.state,
      startTime: gameService.startTime ? gameService.startTime.getTime() : null,
      endTime: gameService.endTime ? gameService.endTime.getTime() : null,
      currentGameIndex: gameMetaManager.currentGame ? gameMetaManager.prevGames.length : null
    };

    const players = playerManager.players.map(player => {
      return {
        ID: player.ID,
        name: player.name,
        scoreboard: {
          win: player.scoreboard.win,
          bid: player.scoreboard.bid,
          scores: Array.from(player.scoreboard.scores)
        }
      }
    });

    const metas = gameMetaManager.getAllMetas().map(meta => {
      return {
        maker: meta.maker,
        name: meta.name,
        cardPerPlayer: meta.cardPerPlayer,
        isExtra: meta.isExtra,
        playerOrder: meta.playerOrder,
      }
    });

    return {
      game,
      players,
      metas
    }
  }

  async load(data: ISerialized) {
    const gameService = this._gameService();
    const playerManager = this._playerManager();
    const gameMetaManager = this._gameMetaManager();
  }
}
