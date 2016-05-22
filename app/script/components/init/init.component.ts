import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingComponent } from '../loading';
import { Player } from '../player.model';
import { GameService } from '../game';

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
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.gameService.getPlayer()
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
    this.gameService.start()
    .then(() => {
      this.isLoading = false;

      // Route to game and change game state to started
      this.router.navigateByUrl('/game');
    })
    .catch(err => {
      this.isLoading = false;
      this.err = err;
    });

  }

  addField() {
    this.gameService.players.push(new Player());
  }

  removeField(index: number) {
    this.gameService.players.splice(index, 1);
  }

  cleanStorage() {
    this.isLoading = true;
    this.gameService.resetPlayer()
    .then(() => {
      this.isLoading = false;
    })
  }

}
