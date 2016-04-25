import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import sum = require('lodash.sum');
import nth = require('lodash.nth');

import {PlayerService} from '../player.service';
import {Player} from '../player.model';

export enum GameState {
  notStarted,  // No info is filled in. Game is not yet started.
  guess,  // Guess for stack before each round
  inputActual,  // Wait for user to input actual stack
  waiting, // This round has ended. Showing this round result and wait for next round to start
  gameEnd  // Game has end by reaching the last round and ended
}

@Injectable()
export class GameService {
  public state: GameState = GameState.notStarted;
  public rounds: number = null;
  public currentRound: number = null;
  public maker: number = 0;
  public players: Player[] = null;
  public score: number[] = [];
  public cardCount: number = 52;  // Number of poker card used in game

  private guess: number[];

  constructor(
    private _playerService: PlayerService,
    private _router: Router
  ) {}

  /**
   * Get player array from PlayerService and save that into this.players as a buffer.
   * Must be called in ngOnInit, ideally in the first component.
   * Feel free to mutate this.players as it is intended. Methods in this service
   * assumes others have mutated that array for input instead of doing complicated stuffs.
   */
  getPlayer() {
    return this._playerService.getPlayer()
    .then(res => {
      this.players = res;
    })
  }

  /**
   * Wrapper for PlayerService.save
   * Save this.player to PlayerService, and return its promise.
   */
  savePlayer() {
    return this._playerService.save(this.players);
  }

  /**
   * Start a new Game.
   * Sets states and save player.
   * Therefore, this is a promise as saving is needed.
   * If validation failes, promise will be rejected with error message.
   */
  start() {
    if (this.players.length <= 1) {
      return Promise.reject('A game cannot be started with no none');
    }

    if (this.cardCount < 52) {
      return Promise.reject('Poker card is less than 52.');
    }

    if (this.players.length > this.cardCount) {
      return Promise.reject('Too many players detected. Or you got too few card.');
    }

    return this.savePlayer()
    .then(() => {
      this.currentRound = 1;
      this.maker = 0;
      this.rounds = Math.floor(this.cardCount / this.players.length);
      this.state = GameState.guess;
    })
  }

  /**
   * Validate and save guess into internal buffer.
   * If validation failed, a string will be returned as error message.
   * Otherwise, undefined will be returned and state is set to next stage.
   */
  saveGuess(guess: number[]) {
    let res = this.validateGuess(guess);

    if (res) {
      return res;
    } else {
      this.state = GameState.inputActual;
      this.guess = guess;
    }
  }

  /**
   * Validate and save actual gained stack into Player model.
   * This does NOT trigger save in PlayerService. Instead, this.nextRound will do that.
   * If validation failed, a string will be returned as error message.
   * Otherwise, undefined will be returned and state is set to next stage.
   */
  saveActual(actual: number[]) {
    let res = this.validateActual(actual);

    if (res) {
      return res;
    } else {
      this.saveActualToPlayer(actual);
      this.roundEnd();
    }
  }

  /**
   * Start next round of the game, and save player models.
   * If that was the last round, state will be set to gameEnd.
   * Maker, state, and round will be set in correct manner.
   */
  nextRound() {
    return this._playerService.save(this.players)
    .then(() => {

      this.score = [];
      this.guess = [];

      if (this.currentRound === this.rounds) {
        // Was the last round. Proceed to end.
        this.state = GameState.gameEnd;
        this.maker = null;
        this.currentRound = null;
        this._router.navigate(['Scoreboard']);
      } else {
        this.maker += 1;
        if (this.maker === this.players.length) {
          this.maker = 0;
        }

        this.state = GameState.guess;
        this.currentRound += 1;
      }
    })
  }

  private validateGuess(guessBuffer: number[]) {
    guessBuffer = guessBuffer.map(n => Number(n));

    if (guessBuffer.length !== this.players.length) {
      let delta = this.players.length - guessBuffer.length;
      return `Last ${delta} players did not make guess`;
    }

    // We must use the good old for loop.
    // Otherwise the undefined check will fail.
    for (let i = 0; i < guessBuffer.length; i++) {
      let guess = guessBuffer[i];

      if (typeof guess === 'undefined') {
        return `${nth(this.players, i).name} did not make a guess`;
      }

      if (guess > this.currentRound) {
        return `${nth(this.players, i).name} is kidding me. ಠ_ಠ`;
      }
    }

    if (sum(guessBuffer) === this.currentRound) {
      let dudeID = this.maker - 1;
      return `${nth(this.players, dudeID).name} cannot choose ${nth(guessBuffer, dudeID)}`
    }
  }

  private validateActual(actualBuffer: number[]) {
    actualBuffer = actualBuffer.map(n => Number(n));

    if (actualBuffer.length !== this.players.length) {
      let delta = this.players.length - actualBuffer.length;
      return `Last ${delta} players did not input actual stack`;
    }

    // We must use the good old for loop.
    // Otherwise the undefined check will fail.
    for (let i = 0; i < actualBuffer.length; i++) {
      let stack = actualBuffer[i];

      if (typeof stack === 'undefined') {
        return `${nth(this.players, i).name} did not input actual stack`;
      }

      if (stack > this.currentRound) {
        return `${nth(this.players, i).name} is kidding me. ಠ_ಠ`;
      }
    }

    if (sum(actualBuffer) !== this.currentRound) {
      return 'Sum of stack is larger than round. Did anyone cheat in cards? ( ͡° ͜ʖ ͡°)';
    }
  }

  private saveActualToPlayer(actual: number[]) {
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      let score = this.calculateScore(this.guess[i], actual[i]);
      player.score[this.currentRound - 1] = score;
      this.score.push(score);
    }
  }

  private calculateScore(guess: number, actual: number) {
    if (guess === actual) {
      return (guess ** 2) + 10;
    } else {
      return - ((actual - guess) ** 2);
    }
  }

  /**
   * Cleanup for round end (Going to waiting state)
   */
  private roundEnd() {
    this.state = GameState.waiting;
  }
}
