import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {LoadingComponent} from '../loading';
import {Player} from '../player.model';
import {GameService} from '../game';

let template: string = require('./init.component.html');

@Component({
  selector: 'init',
  template: template,
  directives: [LoadingComponent]
})
export class InitComponent implements OnInit {

  private isLoading: boolean = false;
  private err:string = '';

  constructor(
    private _router: Router,
    private _gameService: GameService
  ) {}

  ngOnInit() {
    this._gameService.getPlayer()
    .then(res => {
      if (res.isNew) {
        console.log('It is new!');
      }
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.err = '';

    // Save PlayerService
    this._gameService.start()
    .then(() => {
      this.isLoading = false;

      // Route to game and change game state to started
      this._router.navigate(['Game']);
    })
    .catch(err => {
      this.isLoading = false;
      this.err = err;
    });

  }

  addField() {
    this._gameService.players.push(new Player());
  }

  removeField(index: number) {
    this._gameService.players.splice(index, 1);
  }

  cleanStorage() {
    this.isLoading = true;
    this._gameService.resetPlayer()
    .then(() => {
      this.isLoading = false;
    })
  }

}
