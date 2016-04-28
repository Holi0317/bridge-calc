import {Injectable} from 'angular2/core';
import {Player} from './player.model';

const STORAGE_KEY = 'PlayerService.player';

/**
 * Create a list of new player object.
 */
const makeNewPlayer = function() {
  return [
    new Player(),
    new Player(),
    new Player(),
    new Player()
  ]
}

export interface PlayerResponse {
  isNew: boolean;
  value: Player[]
}

@Injectable()
export class PlayerService {

  /**
   * If _memcache is null, use localStorage API.
   * Otherwise, use _memcache.
   */
  private _memcache: Player[] = null;

  constructor() {
    if (!window.localStorage) {
      // No localStorage API supported.
      // Fallback to memcache
      this._memcache = makeNewPlayer();
      console.log('Player Service is now using memcache');
    }
  }

  getPlayer(): Promise<PlayerResponse> {
    if (this._memcache) {
      return Promise.resolve({
        value: this._memcache,
        isNew: true
      });
    } else {
      let value = window.localStorage.getItem(STORAGE_KEY);
      let parsed: Player[] = JSON.parse(value);
      let isNew = false;

      if (!parsed) {
        isNew = true;
        parsed = makeNewPlayer();
      }

      return Promise.resolve({
        isNew: isNew,
        value: parsed
      });

    }
  }

  save(players: Player[]) {
    return new Promise((resolve, reject) => {
      if (this._memcache) {
        this._memcache = players;
        return resolve();
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
        return resolve();
      }
    });
  }

  reset() {
    return new Promise((resolve, reject) => {
      if (this._memcache) {
        this._memcache = [];
        return resolve();
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
        return resolve();
      }
    })
  }

}
