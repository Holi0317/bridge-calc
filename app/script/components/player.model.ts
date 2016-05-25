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

export interface BasePlayer {
  score: number[];
  name: string;
}

export class Player {
  public score: number[];
  public name: string;

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
}
