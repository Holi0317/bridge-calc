import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

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
@RouteConfig([
  {path: '/init', name: 'Init', component: InitComponent, useAsDefault: true},
  {path: '/game', name: 'Game', component: GameComponent},
  {path: '/scoreboard', name: 'Scoreboard', component: ScoreboardComponent}
])
export class AppComponent {
  private tabs: Tab[] = [
    new Tab('Game', 'Game'),
    new Tab('Scoreboard', 'Scoreboard')
  ];

}
