import {LogManager} from 'aurelia-framework';
import {sampleName} from '../services/sample-name';

import type {EntryOptionsData, EntryOptionsError} from '../entry-options/entry-options';

const logger = LogManager.getLogger('EntryView');

export class Entry {
  players: string[];
  options: EntryOptionsData;
  optionsErrors: EntryOptionsError;

  constructor() {
    this.players = [sampleName(), sampleName(), sampleName(), sampleName()];
    this.optionsErrors = {};
  }

  importNames() {
    // TODO Implement import name logic
    logger.debug('Importing names');
  }

  start() {
    // TODO Implement start logic
  }

}
