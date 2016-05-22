import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { InitComponent } from './init';
import { ScoreboardComponent } from './scoreboard';
import { GameComponent, GameService, BufferService } from './game';
import { PlayerService } from './player.service';

let template: string = require('./app.component.html');

class Tab {
  constructor(
    public title: string,
    public routeName: string
  ) {}
}

@Component({
  selector: 'app',
  template: template,
  directives: [ROUTER_DIRECTIVES, GameComponent],
  providers: [ROUTER_PROVIDERS, GameService, PlayerService, BufferService]
})
@Routes([
  {path: '/init', component: InitComponent /* useAsDefault: true */}, // useAsDefault is WIP in RC router
  {path: '/game', component: GameComponent},
  {path: '/scoreboard', component: ScoreboardComponent}
])
export class AppComponent {
  private tabs: Tab[] = [
    new Tab('Game', '/game'),
    new Tab('Scoreboard', '/scoreboard')
  ];

}
