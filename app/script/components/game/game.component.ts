import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingComponent } from '../loading';
import { GameService, GameState } from './game.service';
import { BufferService } from './buffer.service';
import { Player } from '../player.model';

import minilog = require('minilog');
let log = minilog('game.component');

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

  next() {
    this.errorMessage = '';
    if (this.guessActive) {
      this.errorMessage = this.gameService.saveGuess(this.buffer.guessBuffer);
    } else if (this.actualActive) {
      this.errorMessage = this.gameService.saveActual(this.buffer.actualBuffer);
    } else {
      log.debug('Proceeding to next round.');
      this.buffer.reset();
      this.isLoading = true;
      this.gameService.nextRound()
      .then(() => {
        log.debug('Next round loaded.');
        this.isLoading = false;
      })
    }
  }

  prev() {
    this.gameService.state--;
    this.errorMessage = 'Rolling back to previous state may cause many unwanted bugs. This is discouraged. BTW, are you a man?';
  }

  get canNext() {
    return true;
  }

  get canPrev() {
    return !this.guessActive;
  }

  get guessActive() {
    return this.gameService.state === GameState.guess;
  }

  get actualActive() {
    return this.gameService.state === GameState.inputActual;
  }

  get nextRoundActive() {
    return this.gameService.state === GameState.waiting;
  }
}
