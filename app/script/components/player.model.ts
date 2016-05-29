import sum = require('lodash.sum');
import { PLAYER_NAME } from './player-name';

import minilog = require('minilog');
let log = minilog('player.model');

function randomChoose<T>(a: T[]): T {
  return a[Math.floor(Math.random()*a.length)];
}

function calcStats(score: number[]) {
  let combo = 0;
  let miss = 0;

  for (let s of score) {
    if (s > 0) {
      combo++;
    } else {
      combo = 0;
      miss++;
    };
  }

  return [combo, miss];
}

export interface BasePlayer {
  score: number[];
  name: string;
}

export class Player {
  public score: number[];
  public name: string;

  private lastRound: number = null;  // Previous round number when invoked functions related to this variable
  private comboBuf: number = null;
  private missBuf: number = null;

  constructor(base?: BasePlayer) {
    if (typeof base === 'undefined') {
      // Whole new player.
      this.score = [];
      this.name = randomChoose(PLAYER_NAME);
    } else {
      log.debug('Loading player from BasePlayer. Name: ', base.name);
      this.score = base.score;
      this.name = base.name;
    }
  }

  get totalScore() {
    return sum(this.score);
  }

  get combo() {
    this.calcStats();
    return this.comboBuf;
  }

  get miss() {
    this.calcStats();
    return this.missBuf;
  }

  get comment() {
    this.calcStats();

    if (this.score.length < 3) {
      return '';
    }

    if (this.miss === 0) {
      return '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ PERFECT ✧ﾟ･: *ヽ(◕ヮ◕ヽ)';
    }

    if (this.miss === 1) {
      return '(☞ﾟヮﾟ)☞ UCCU ☜(ﾟヮﾟ☜)';
    }

    if (this.miss === this.score.length) {
      return 'Achievement get: Never win ಠ_ಠ';
    }

    return '';
  }

  private calcStats() {
    if (this.lastRound === this.score.length) {
      return;
    }
    log.debug('Statics is outdated. Calculating the new statics.');
    this.lastRound = this.score.length;
    [this.comboBuf, this.missBuf] = calcStats(this.score);
  }
}
