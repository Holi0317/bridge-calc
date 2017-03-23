import {autoinject} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'
import {Router} from 'aurelia-router'
import {IStartOptions} from '../services/game-board/game-board'
import {GameBoardManager} from '../services/game-board/game-board-manager'
import {sampleName} from '../services/game-board/sample-name'
import {IEntryOptionsError} from '../validators/entry-options'

const logger = getLogger('EntryView')

@autoinject()
export class Entry {
  public players: string[] = [sampleName(), sampleName(), sampleName(), sampleName()]
  public options: IStartOptions
  public optionsErrors: IEntryOptionsError
  public hasError = false

  constructor(
    private router: Router,
    private _gameBoardManager: GameBoardManager
  ) {

  }

  public importNames() {
    // TODO Implement import name logic
    logger.debug('Importing names')
  }

  public start() {
    if (this.hasError) {
      return
    }
    this._gameBoardManager.start({
      ...this.options,
      players: this.players
    })
    this.router.navigateToRoute('game')
  }

}
