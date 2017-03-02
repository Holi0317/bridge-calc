import {BaseValidateResult, isOk} from './validate-util';

export interface EntryOptionsValidatorOptions {
  cards: string
  rounds: string
  startingRound: string
  playerLength: number;
}

export interface EntryOptionsError {
  cards: string
  rounds: string
  startingRound: string
}

export interface EntryOptionsValidationResult extends BaseValidateResult {
  err: EntryOptionsError
}

/**
 * Is given number a positive integer?
 * @param d
 * @returns {boolean}
 */
function isInteger(d: number) {
  return d > 0 && Number.isInteger(d);
}

class EntryOptionsValidator {
  private err: EntryOptionsError;

  validate(opt: EntryOptionsValidatorOptions): EntryOptionsValidationResult {
    this._resetError();

    const cards = +opt.cards;
    const rounds = +opt.rounds;
    const startingRound = +opt.startingRound;
    const playerLength = opt.playerLength;

    this.setError('cards', !isInteger(cards), 'Card must be a positive integer');
    this.setError('rounds', !isInteger(rounds), 'Rounds must be a positive integer');
    this.setError('startingRound', !isInteger(startingRound), 'Starting round must be a positive integer');

    this.setError('cards', playerLength > cards, 'Too few cards');
    this.setError('rounds', rounds > cards / playerLength, 'Insufficient cards for that much rounds');
    this.setError('startingRound', startingRound > rounds, 'Impossible to start beyond the end of the game');

    return {
      ok: isOk(this.err),
      err: this.err
    };
  }

  private _resetError() {
    this.err = {
      cards: '',
      rounds: '',
      startingRound: ''
    }
  }

  private setError(prop: keyof EntryOptionsError, test: boolean, message: string) {
    if (test && !this.err[prop]) {
      this.err[prop] = message;
    }
  }
}

export function entryOptionsValidator(opts: EntryOptionsValidatorOptions) {
  // TODO make this a pure function
  let validator = new EntryOptionsValidator();
  return validator.validate(opts);
}
