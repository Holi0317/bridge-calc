import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {MdButton} from '@angular2-material/button/';
import {MdInput} from '@angular2-material/input/';

import {LoadingComponent} from '../loading';
import {Player} from '../player.model';
import {GameService} from '../game';

let template: string = require('./init.component.html');

@Component({
  selector: 'init',
  template: template,
  directives: [MdButton, MdInput, LoadingComponent]
})
export class InitComponent implements OnInit {

  private isLoading: boolean = false;
  private model: Player[] = [];

  constructor(
    private _router: Router,
    private _gameService: GameService
  ) {}

  ngOnInit() {
    this._gameService.getPlayer()
    .then(() => {
      this.model = this._gameService.players;
    })
  }

  onSubmit() {
    // Validate
    if (this.model.length <= 0 || this.model.length >= 52) {
      return;
    }

    this.isLoading = true;

    // Save PlayerService
    this._gameService.start()
    .then(() => {
      this.isLoading = false;

      // Route to game and change game state to started
      this._router.navigate(['Game']);
    });

  }

  addField() {
    this.model.push(new Player());
  }

  removeField(index: number) {
    this.model.splice(index, 1);
  }

  get roundCount() {
    if (this.model.length === 0) {
      return 0;
    }
    return Math.floor(52 / this.model.length);
  }
}
