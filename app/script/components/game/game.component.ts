import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingComponent } from '../loading';
import { GameService, GameState } from './game.service';
import { BufferService } from './buffer.service';
import { Player } from '../player.model';

let template: string = require('./game.component.html');

@Component({
  selector: 'game',
  template: template,
  directives: [LoadingComponent]
})
export class GameComponent implements OnInit {

  private errorMessage: string;
  private isLoading = false;

  constructor(
    private gameService: GameService,
    private router: Router,
    private buffer: BufferService
  ) {}

  ngOnInit() {
    // Ensure game info is filled in
    if (this.gameService.state === GameState.notStarted) {
      this.router.navigateByUrl('/init');
    }
    // Game ended. Goto scoreboard.
    if (this.gameService.state === GameState.gameEnd) {
      this.router.navigateByUrl('/scoreboard');
    }
  }

  markMaker(i: number) {
    if (i === this.gameService.maker) {
      return '(Maker)'
    }
  }

  submitGuess() {
    this.errorMessage = this.gameService.saveGuess(this.buffer.guessBuffer);
  }

  submitActual() {
    this.errorMessage = this.gameService.saveActual(this.buffer.actualBuffer);
  }

  nextRound() {
    this.buffer.reset();
    this.isLoading = true;
    this.gameService.nextRound()
    .then(() => {
      this.isLoading = false;
    })
  }

  get guessActive(): boolean {
    return this.gameService.state === GameState.guess;
  }

  get actualActive() {
    return this.gameService.state === GameState.inputActual;
  }

  get nextRoundActive() {
    return this.gameService.state === GameState.waiting;
  }
}
