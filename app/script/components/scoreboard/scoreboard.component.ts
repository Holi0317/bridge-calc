import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

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
