import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {GameService, GameState} from '../game';

let template = require('./scoreboard.component.html');

@Component({
  selector: 'scoreboard',
  template: template
})
export class ScoreboardComponent implements OnInit {
  constructor(
    private _router: Router,
    private _gameService: GameService
  ) {}

  ngOnInit() {
    if (this._gameService.state === GameState.notStarted) {
      this._router.navigate(['Init']);
    }
  }
}
