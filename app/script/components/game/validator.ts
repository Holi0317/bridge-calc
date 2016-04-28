import {GameService} from './game.service';

import nth = require('lodash.nth');
import sum = require('lodash.sum');

export function start(that: GameService) {
  if (that.players.length <= 1) {
    return 'A game cannot be started with no none';
  }

  if (that.cardCount < 52) {
    return 'Poker card is less than 52.';
  }

  if (that.players.length > that.cardCount) {
    return 'Too many players detected. Or you got too few card.';
  }

  return null;
}

export function validateGuess(guessBuffer: number[], that: GameService) {
  guessBuffer = guessBuffer.map(n => Number(n));

  if (guessBuffer.length !== that.players.length) {
    let delta = that.players.length - guessBuffer.length;
    return `Last ${delta} players did not make guess`;
  }

  // We must use the good old for loop.
  // Otherwise the undefined check will fail.
  for (let i = 0; i < guessBuffer.length; i++) {
    let guess = guessBuffer[i];

    if (typeof guess === 'undefined') {
      return `${nth(that.players, i).name} did not make a guess`;
    }

    if (guess > that.currentRound) {
      return `${nth(that.players, i).name} is kidding me. ಠ_ಠ`;
    }
  }

  if (sum(guessBuffer) === that.currentRound) {
    let dudeID = that.maker - 1;
    return `${nth(that.players, dudeID).name} cannot choose ${nth(guessBuffer, dudeID)}`
  }

  return null;
}

export function validateActual(actualBuffer: number[], that: GameService) {
  actualBuffer = actualBuffer.map(n => Number(n));

  if (actualBuffer.length !== that.players.length) {
    let delta = that.players.length - actualBuffer.length;
    return `Last ${delta} players did not input actual stack`;
  }

  // We must use the good old for loop.
  // Otherwise the undefined check will fail.
  for (let i = 0; i < actualBuffer.length; i++) {
    let stack = actualBuffer[i];

    if (typeof stack === 'undefined') {
      return `${nth(that.players, i).name} did not input actual stack`;
    }

    if (stack > that.currentRound) {
      return `${nth(that.players, i).name} is kidding me. ಠ_ಠ`;
    }
  }

  if (sum(actualBuffer) !== that.currentRound) {
    return 'Sum of stack is larger than round. Did anyone cheat in cards? ( ͡° ͜ʖ ͡°)';
  }

  return null;
}
