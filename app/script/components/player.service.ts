import { Injectable } from '@angular/core';
import { Player, BasePlayer } from './player.model';

import minilog = require('minilog');
let log = minilog('player.service');

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
   * If memcache is null, use localStorage API.
   * Otherwise, use memcache.
   */
  private memcache: Player[] = null;

  constructor() {
    if (!window.localStorage) {
      // No localStorage API supported.
      // Fallback to memcache
      this.memcache = makeNewPlayer();
      log.debug('localStorage API is not supported. Falling back to memcache');
    } else {
      log.debug('localStorage API is supported.');
    }
  }

  getPlayer(): Promise<PlayerResponse> {
    if (this.memcache) {
      return Promise.resolve({
        value: this.memcache,
        isNew: true
      });
    } else {
      let value = window.localStorage.getItem(STORAGE_KEY);
      let parsed: BasePlayer[] = JSON.parse(value);
      log.debug('Parsed localStorage item. Result: ', parsed);

      let ret: PlayerResponse = {
        isNew: false,
        value: null
      };

      if (!parsed) {
        // New
        log.debug('Nothing exists in localStorage. Creating a new instance.');
        ret.isNew = true;
        ret.value = makeNewPlayer();
      } else {
        // Upgrade data from localStorage
        log.debug('Upgrade data from localStorage');
        ret.isNew = false;
        ret.value = parsed.map(base => new Player(base));
      }

      return Promise.resolve(ret);

    }
  }

  save(players: Player[]) {
    return new Promise((resolve, reject) => {
      if (this.memcache) {
        this.memcache = players;
        return resolve();
      } else {
        log.debug('Save players to localStorage. Received data: ', players);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
        return resolve();
      }
    });
  }

  reset() {
    return new Promise((resolve, reject) => {
      if (this.memcache) {
        this.memcache = [];
        return resolve();
      } else {
        log.debug('Flush players from localStorage.');
        window.localStorage.removeItem(STORAGE_KEY);
        return resolve();
      }
    })
  }

}
