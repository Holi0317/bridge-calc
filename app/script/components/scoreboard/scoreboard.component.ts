import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService, GameState, BufferService } from '../game';
import { LoadingComponent } from '../loading';

import minilog = require('minilog');
let log = minilog('scoreboard.component');

let template = require('./scoreboard.component.html');

@Component({
  selector: 'scoreboard',
  template: template,
  directives: [LoadingComponent]
})
export class ScoreboardComponent implements OnInit {

  private isLoading = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private bufferService: BufferService
  ) {}

  ngOnInit() {
    if (this.gameService.state === GameState.notStarted) {
      log.debug('Game not started. Routing to init.')
      this.router.navigateByUrl('/init');
    }
  }

  newGame() {
    this.isLoading = true;
    this.gameService.reset()
    .then(() => {
      this.bufferService.reset();
      this.router.navigateByUrl('/init');
    })
  }

  private get gameStarted() {
    return this.gameService.state !== GameState.notStarted;
  }
}
