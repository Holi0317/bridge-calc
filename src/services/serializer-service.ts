import {lazy} from 'aurelia-framework';
import {GameService} from './game-service';
import {PlayerManager} from './player-manager';
import {GameMetaManager} from './game-meta-manager';
import {ISerialized} from '../storage/interfaces';
import {TimerService} from './timer-service';

/**
 * Dump and load gameService, playerManagerService and gameMetaService data to plain object
 * for persistent storage.
 */
export class SerializerService {
  constructor(
    @lazy(GameService) private _gameService: () => GameService,
    @lazy(PlayerManager) private _playerManager: () => PlayerManager,
    @lazy(GameMetaManager) private _gameMetaManager: () => GameMetaManager,
    @lazy(TimerService) private _timerService: () => TimerService
  ) {

  }

  dump(): ISerialized {
    const gameService = this._gameService();
    const playerManager = this._playerManager();
    const gameMetaManager = this._gameMetaManager();
    const timerService = this._timerService();

    const game = {
      state: gameService.state,
      currentGameIndex: gameMetaManager.currentGame ? gameMetaManager.prevGames.length : null
    };

    return {
      game,
      players: playerManager.dump(),
      metas: gameMetaManager.dump(),
      timer: timerService.dump()
    }
  }

  load(data: ISerialized): void {
    const gameService = this._gameService();
    const playerManager = this._playerManager();
    const gameMetaManager = this._gameMetaManager();
    const timerService = this._timerService();

    gameService.state = data.game.state;
    playerManager.load(data.players);
    gameMetaManager.load(data.metas, data.game.currentGameIndex);
    timerService.load(data.timer);
  }
}
