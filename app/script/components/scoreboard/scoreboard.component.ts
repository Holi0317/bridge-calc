import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { GameService, GameState } from '../game';

let template = require('./scoreboard.component.html');

@Component({
  selector: 'scoreboard',
  template: template
})
export class ScoreboardComponent implements OnInit {
  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    if (this.gameService.state === GameState.notStarted) {
      this.router.navigate(['Init']);
    }
  }
}
