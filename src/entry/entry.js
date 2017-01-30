import {inject, LogManager} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {sampleName} from '../services/sample-name';
import {GameService, StartOptions} from '../services/game-service';

import type {EntryOptionsError} from '../entry-options/entry-options';

const logger = LogManager.getLogger('EntryView');

@inject(Router, GameService)
export class Entry {
  players: string[];
  options: StartOptions.options;
  optionsErrors: EntryOptionsError;
  hasError: boolean;

  gameService: GameService;
  router: Router;

  constructor(router: Router, gameService: GameService) {
    this.players = [sampleName(), sampleName(), sampleName(), sampleName()];
    this.optionsErrors = {};
    this.router = router;
    this.gameService = gameService;
  }

  importNames() {
    // TODO Implement import name logic
    logger.debug('Importing names');
  }

  start() {
    if (this.hasError) {
      return
    }
    this.gameService.start({
      players: this.players,
      options: this.options
    });
    this.router.navigateToRoute('game');
  }

}
