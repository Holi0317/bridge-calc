import {inject, bindable, bindingMode, LogManager} from 'aurelia-framework';
import isInteger from 'lodash.isinteger';

const logger = LogManager.getLogger('EntryOptionsComponent');

export class EntryOptions {
  /**
   * Number of players.
   */
  @bindable() playerLength: number;
  /**
   * Number of cards.
   * Controlled by this component.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay }) cards: string;
  /**
   * Number of rounds.
   * Controlled by this component.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay }) rounds: string;
  /**
   * The round to start from.
   * Controlled by this component.
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay }) startingRound: string;
  /**
   * Errors of fields controlled by this component
   */
  errors: {
    card: string,
    round: string,
    startingRound: string
  };

  constructor() {
    this.resetError();
    this.cards = 52;
    this.rounds = 13;
    this.startingRound = 1;
  }

  attached() {
    this.resetRounds();
  }

  /**
   * Reset rounds by calculating rounds according to length of players.
   */
  resetRounds() {
    if (!this.playerLength) {
      return;
    }
    this.rounds = Math.floor(this.cards / this.playerLength);
  }

  /**
   * Set all err to empty string.
   */
  resetError() {
    this.errors = {
      card: '',
      round: '',
      startingRound: ''
    };
  }

  /**
   * Validate if there is any error in entered data.
   * TODO make this more concise
   */
  validate() {
    this.resetError();
    const cards = +this.cards;
    const playerLength = +this.playerLength;
    const rounds = +this.rounds;
    const startingRound = +this.startingRound;
    if (cards <= 0) {
      this.errors.card = 'Card number must be larger than 0';
      return
    }
    if (!isInteger(cards)) {
      this.errors.card = 'Card number must be an integer';
      return
    }
    if (playerLength > cards) {
      this.errors.card = 'Too less cards';
      return
    }
    if (rounds <= 0) {
      this.errors.round = 'Card number must be larger than 0';
      return
    }
    if (!isInteger(rounds)) {
      this.errors.round = 'Round must be an integer';
      return
    }
    if (rounds > cards / playerLength) {
      this.errors.round = 'Insufficient cards for that much rounds';
      return
    }
    if (startingRound <= 0) {
      this.errors.startingRound = 'Starting round must be larger than 0';
      return
    }
    if (!isInteger(startingRound)) {
      this.errors.round = 'Starting round must be an integer';
      return
    }
    if (startingRound > rounds) {
      this.errors.startingRound = 'Impossible to start beyond the end of the game';
      return
    }
  }

  cardsChanged(newValue: number, oldValue: number) {
    this.resetRounds();
    this.validate();
  }

  roundsChanged(newValue: number, oldValue: number) {
    this.validate();
  }

  playerLengthChanged(newValue: number, oldValue: number) {
    this.resetRounds();
    this.validate()
  }

  startingRoundChanged(newValue: number, oldValue: number) {
    this.validate();
  }
}
