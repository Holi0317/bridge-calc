import { Injectable } from '@angular/core';
import { Player, BasePlayer } from './player.model';

const STORAGE_KEY = 'PlayerService.player';

/**
 * Create a list of new player object.
 */
export function makeNewPlayer() {
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
      let parsed: BasePlayer[] = JSON.parse(value);
      let ret: PlayerResponse = {
        isNew: false,
        value: null
      };

      if (!parsed) {
        // New
        ret.isNew = true;
        ret.value = makeNewPlayer();
      } else {
        // Upgrade data from localStorage
        ret.isNew = false;
        ret.value = parsed.map(base => new Player(base));
      }

      return Promise.resolve(ret);

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
