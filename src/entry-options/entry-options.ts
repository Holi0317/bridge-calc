import {bindable, bindingMode} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {StartOptions} from '../services/game-service';

const logger = getLogger('EntryOptionsComponent');

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
    this.errors = {
      cards: '',
      rounds: '',
      startingRound: ''
    };
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
   * Is data a positive integer?
   * @param d
   */
  isInteger(d: number) {
    return d > 0 && Number.isInteger(d);
  }

  /**
   * Validate if there is any error in entered data.
   * TODO tidy this mess up again
   */
  validate() {
    const cards = +this._cards;
    const rounds = +this._rounds;
    const startingRound = +this._startingRound;

    this.errors.cards = this.isInteger(cards) ? '' : 'Card must be a positive integer';
    this.errors.rounds = this.isInteger(rounds) ? '' : 'Rounds must be a positive integer';
    this.errors.startingRound = this.isInteger(startingRound) ? '' : 'Starting round must be a positive integer';

    if (this.playerLength > cards) {
      this.errors.cards = 'Too few cards';
      return
    }
    if (rounds > cards / this.playerLength) {
      this.errors.rounds = 'Insufficient cards for that much rounds';
      return
    }
    if (startingRound > rounds) {
      this.errors.startingRound = 'Impossible to start beyond the end of the game';
      return
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
