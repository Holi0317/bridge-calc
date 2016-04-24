import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {MdInput} from '@angular2-material/input/';
import {MdButton} from '@angular2-material/button/';

import {LoadingComponent} from '../loading';
import {GameService, GameState} from './game.service';
import {BufferService} from './buffer.service';
import {Player} from '../player.model';

let template: string = require('./game.component.html');

@Component({
  selector: 'game',
  template: template,
  directives: [MdInput, MdButton, LoadingComponent]
})
export class GameComponent implements OnInit {

  private _errorMessage: string;
  private isLoading = false;

  constructor(
    private _gameService: GameService,
    private _router: Router,
    private buffer: BufferService
  ) {}

  ngOnInit() {
    // Ensure game info is filled in
    if (this._gameService.state === GameState.notStarted) {
      this._router.navigate(['Init']);
    }
    // Game ended. Goto scoreboard.
    if (this._gameService.state === GameState.gameEnd) {
      this._router.navigate(['Scoreboard']);
    }
  }

  markMaker(i: number) {
    if (i === this._gameService.maker) {
      return '(Maker)'
    }
  }

  submitGuess() {
    this._errorMessage = this._gameService.saveGuess(this.buffer.guessBuffer);
  }

  submitActual() {
    this._errorMessage = this._gameService.saveActual(this.buffer.actualBuffer);
  }

  nextRound() {
    this.buffer.reset();
    this.isLoading = true;
    this._gameService.nextRound()
    .then(() => {
      this.isLoading = false;
    })
  }

  get guessActive(): boolean {
    return this._gameService.state === GameState.guess;
  }

  get actualActive() {
    return this._gameService.state === GameState.inputActual;
  }

  get nextRoundActive() {
    return this._gameService.state === GameState.waiting;
  }
}
