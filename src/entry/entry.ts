import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {Router} from 'aurelia-router';
import {sampleName} from '../services/game-board/sample-name';
import {EntryOptionsError} from '../validators/entry-options';
import {StartOptions} from '../services/game-board/game-board';
import {GameBoardManager} from '../services/game-board/game-board-manager';

const logger = getLogger('EntryView');

@autoinject()
export class Entry {
  public players: string[] = [sampleName(), sampleName(), sampleName(), sampleName()];
  public options: StartOptions;
  public optionsErrors: EntryOptionsError;
  public hasError = false;

  constructor(
    private router: Router,
    private _gameBoardManager: GameBoardManager
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
    this._gameBoardManager.start({
      ...this.options,
      players: this.players
    });
    this.router.navigateToRoute('game');
  }

}
