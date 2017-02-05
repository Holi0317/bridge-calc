import {bindable, bindingMode} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {StartOptions} from '../services/game-service';

const logger = getLogger('EntryOptionsComponent');

/**
 * Is given number a positive integer?
 * @param d
 * @returns {boolean}
 */
function isInteger(d: number) {
  return d > 0 && Number.isInteger(d);
}

export interface EntryOptionsError {
  cards: string,
  rounds: string,
  startingRound: string
}

export class EntryOptions {
  /**
   * Number of players.
   */
  @bindable()
  public playerLength: number;

  /**
   * All options for entry.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public options: StartOptions;

  /**
   * All errors in options.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public errors: EntryOptionsError;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public hasError: boolean;

  @bindable()
  private _cards = '52';
  @bindable()
  private _rounds = '13';
  @bindable()
  private _startingRound = '1';

  constructor() {
    this.resetError();
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
   * Reset error object to no error.
   */
  resetError() {
    this.errors = {
      cards: '',
      rounds: '',
      startingRound: ''
    };
  }

  /**
   * Validate if there is any error in entered data.
   * TODO tidy this mess up again
   */
  validate() {
    const cards = +this._cards;
    const rounds = +this._rounds;
    const startingRound = +this._startingRound;

    this.resetError();

    this.setError('cards', !isInteger(cards), 'Card must be a positive integer');
    this.setError('rounds', !isInteger(rounds), 'Rounds must be a positive integer');
    this.setError('startingRound', !isInteger(startingRound), 'Starting round must be a positive integer');

    this.setError('cards', this.playerLength > cards, 'Too few cards');
    this.setError('rounds', rounds > cards / this.playerLength, 'Insufficient cards for that much rounds');
    this.setError('startingRound', startingRound > rounds, 'Impossible to start beyond the end of the game');
  }

  /**
   * Set error to the error object.
   * If there is already a value exist, no operation would be done.
   * @param prop - Property to be set in this.error object
   * @param test - If true, attempt to set error. Otherwise, no-op
   * @param message - Message to be set if test is true.
   */
  private setError(prop: 'cards'|'rounds'|'startingRound', test: boolean, message: string) {
    if (test && !this.errors[prop]) {
      this.errors[prop] = message;
    }
  }

  /**
   * Synchronize input data to this.options
   */
  sync() {
    this.options = {
      cards: +this._cards,
      rounds: +this._rounds,
      startingRound: +this._startingRound,
      players: []
    };
    this.hasError = this.errors.cards !== '' || this.errors.rounds !== '' || this.errors.startingRound !== '';
  }

  _cardsChanged(newValue: string, oldValue: string) {
    this.resetRounds();
    this.validate();
    this.sync();
  }

  _roundsChanged(newValue: string, oldValue: string) {
    this.validate();
    this.sync();
  }

  _startingRoundChanged(newValue: string, oldValue: string) {
    this.validate();
    this.sync();
  }

  playerLengthChanged(newValue: string, oldValue: string) {
    this.resetRounds();
    this.validate();
    this.sync();
  }
}
