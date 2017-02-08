import {autoinject, bindable, bindingMode} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {StartOptions} from '../services/game-service';
import {EntryOptionsValidator, EntryOptionsError} from '../validators/entry-options';

const logger = getLogger('EntryOptionsComponent');

@autoinject()
export class EntryOptions {
  /**
   * Number of players.
   */
  @bindable()
  public playerLength: number;

  /**
   * All validated options for entry.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public options: StartOptions;

  /**
   * All errors in options.
   */
  @bindable()
  public errors: EntryOptionsError;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public hasError: boolean;

  @bindable()
  private _cards = '52';
  @bindable()
  private _rounds = '13';
  @bindable()
  private _startingRound = '1';

  constructor(private _validator: EntryOptionsValidator) {
    this.hasError = false;
  }

  attached() {
    this.resetRounds();
    this.options = {
      cards: 52,
      rounds: 13,
      startingRound: 1,
      players: []
    };
  }

  /**
   * Reset rounds by calculating rounds according to length of players.
   */
  resetRounds() {
    if (!this.playerLength) {
      return;
    }
    this._rounds = Math.floor(+this._cards / this.playerLength) + '';
  }

  /**
   * Validate and synchronize input data to this.options
   */
  sync() {
    const res = this._validator.validate({
      cards: this._cards,
      rounds: this._rounds,
      startingRound: this._startingRound,
      playerLength: this.playerLength
    });

    this.errors = res.err;
    this.hasError = !res.ok;

    this.options = {
      cards: +this._cards,
      rounds: +this._rounds,
      startingRound: +this._startingRound,
      players: []
    };
  }

  _cardsChanged(newValue: string, oldValue: string) {
    this.resetRounds();
    this.sync();
  }

  _roundsChanged(newValue: string, oldValue: string) {
    this.sync();
  }

  _startingRoundChanged(newValue: string, oldValue: string) {
    this.sync();
  }

  playerLengthChanged(newValue: string, oldValue: string) {
    this.resetRounds();
    this.sync();
  }
}
