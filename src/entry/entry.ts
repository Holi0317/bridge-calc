import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {Router} from 'aurelia-router';
import {sampleName} from '../services/game-board/sample-name';
import {GameService, StartOptions} from '../services/game-service';
import {EntryOptionsError} from '../validators/entry-options';

const logger = getLogger('EntryView');

@autoinject()
export class Entry {
  public players: string[] = [sampleName(), sampleName(), sampleName(), sampleName()];
  public options: StartOptions;
  public optionsErrors: EntryOptionsError;
  public hasError = false;

  constructor(
    private router: Router,
    private gameService: GameService
  ) {

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
      ...this.options,
      players: this.players
    });
    this.router.navigateToRoute('game');
  }

}
