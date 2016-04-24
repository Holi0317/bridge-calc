import {Injectable} from 'angular2/core';
import {Player} from './player.model';

@Injectable()
export class PlayerService {

  private _players: Player[] = [
    new Player(),
    new Player(),
    new Player(),
    new Player()
  ];

  getPlayer() {
    return Promise.resolve(this._players);
  }

  save(players: Player[]) {
    return new Promise((resolve, reject) => {
      this._players = players;
      resolve();
    });
  }

}
