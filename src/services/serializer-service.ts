import {lazy} from 'aurelia-framework';
import {GameService} from './game-service';
import {PlayerManagerService} from './player-manager-service';
import {GameMetaService} from './game-meta-service';
import {ISerialized} from '../storage/interfaces';

/**
 * Dump and load gameService, playerManagerService and gameMetaService data to plain object
 * for persistent storage.
 */
export class SerializerService {
  constructor(
    @lazy(GameService) private _gameService: () => GameService,
    @lazy(PlayerManagerService) private _playerManager: () => PlayerManagerService,
    @lazy(GameMetaService) private _gameMetaService: () => GameMetaService
  ) {

  }

  dump(): ISerialized {
    const gameService = this._gameService();
    const playerManager = this._playerManager();
    const gameMetaService = this._gameMetaService();

    const game = {
      state: gameService.state,
      startTime: gameService.startTime ? gameService.startTime.getTime() : null,
      endTime: gameService.endTime ? gameService.endTime.getTime() : null,
      currentGameIndex: gameMetaService.currentGame ? gameMetaService.prevGames.length : null
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

    const metas = gameMetaService.getAllMetas().map(meta => {
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
    const gameMetaService = this._gameMetaService();
  }
}
