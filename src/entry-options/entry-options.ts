import {autoinject, bindable, bindingMode} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'
import {IStartOptions} from '../services/game-board/game-board'
import {entryOptionsValidator, IEntryOptionsError} from '../validators/entry-options'

const logger = getLogger('EntryOptionsComponent')

@autoinject()
export class EntryOptions {
  /**
   * Number of players.
   */
  @bindable()
  public playerLength: number

  /**
   * All validated options for entry.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public options: IStartOptions

  /**
   * All errors in options.
   */
  @bindable()
  public errors: IEntryOptionsError

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public hasError: boolean

  @bindable()
  private _cards = '52'
  @bindable()
  private _rounds = '13'
  @bindable()
  private _startingRound = '1'

  constructor() {
    this.hasError = false
  }

  public attached() {
    this.resetRounds()
    this.options = {
      cards: 52,
      players: [],
      rounds: 13,
      startingRound: 1
    }
  }

  /**
   * Reset rounds by calculating rounds according to length of players.
   */
  public resetRounds() {
    if (!this.playerLength) {
      return
    }
    this._rounds = Math.floor(+this._cards / this.playerLength) + ''
  }

  /**
   * Validate and synchronize input data to this.options
   */
  public sync() {
    const res = entryOptionsValidator({
      cards: this._cards,
      playerLength: this.playerLength,
      rounds: this._rounds,
      startingRound: this._startingRound
    })

    this.errors = res.err
    this.hasError = !res.ok

    this.options = {
      cards: +this._cards,
      players: [],
      rounds: +this._rounds,
      startingRound: +this._startingRound
    }
  }

  public _cardsChanged(newValue: string, oldValue: string) {
    this.resetRounds()
    this.sync()
  }

  public _roundsChanged(newValue: string, oldValue: string) {
    this.sync()
  }

  public _startingRoundChanged(newValue: string, oldValue: string) {
    this.sync()
  }

  public playerLengthChanged(newValue: string, oldValue: string) {
    this.resetRounds()
    this.sync()
  }
}
