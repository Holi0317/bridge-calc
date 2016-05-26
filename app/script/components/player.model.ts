import sum = require('lodash.sum');

import minilog = require('minilog');
let log = minilog('player.model');

const PLAYER_NAME = [
  'John',
  'Thomas',
  'William',
  'Richard',
  'Robert',
  'Edward',
  'James',
  'George',
  'Henry',
  'Francis',
  'Nicholas',
  'Samuel',
  'Joseph',
  'Anthony',
  'Matthew',
  'Edmund',
  'Christopher',
  'Andrew',
  'Ralph',
  'Michael',
  'Peter',
  'Philip',
  'Daniel',
  'Roger',
  'Nathaniel',
  'Charles',
  'Walter',
  'Humphrey',
  'Alexander',
  'Benjamin',
  'Hugh',
  'Stephen',
  'Abraham',
  'Bernard',
  'Simon',
  'Miles',
  'Rowland',
  'Arthur',
  'Jonathan',
  'Mark',
  'Allen',
  'Ellis',
  'Martin',
  'Cuthbert',
  'David',
  'Gabriel',
  'Jonas',
  'Lawrence',
  'Elizabeth',
  'Mary',
  'Anne',
  'Margaret',
  'Alice',
  'Jane',
  'Joan',
  'Agnes',
  'Susanna',
  'Dorothy',
  'Catherine',
  'Sarah',
  'Grace',
  'Isabel',
  'Martha',
  'Elinor',
  'Ellen',
  'Frances',
  'Hannah',
  'Bridget',
  'Margery',
  'Rebecca',
  'Joyce',
  'Barbara',
  'Judith',
  'Joanna',
  'Hester',
  'Thomasin',
  'Cecily',
  'Amy',
  'Rachel',
  'Helen',
  'Janet',
  'Christian',
  'Temperance',
  'Abigail',
  'Charity',
  'Deborah',
  'Patience',
  'Esther',
  'Lucy',
  'Ursula',
  'Mabel',
  'Marion',
  'Millicent',
  'Priscilla',
  'Ruth',
  'Faith',
  'Sybil',
  'Winifred'
]

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

  private calcStats() {
    if (this.lastRound === this.score.length) {
      return;
    }
    log.debug('Statics is outdated. Calculating the new statics.');
    this.lastRound = this.score.length;
    [this.comboBuf, this.missBuf] = calcStats(this.score);
  }
}
