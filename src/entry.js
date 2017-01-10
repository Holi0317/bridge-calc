import {inject, LogManager} from 'aurelia-framework';
import {sampleName} from './services/sample-name';
import {LayoutService} from './services/layout-service';

const logger = LogManager.getLogger('EntryView');

@inject(LayoutService)
export class Entry {
  layoutService: LayoutService;
  players: string[];

  constructor(layoutService: LayoutService) {
    this.layoutService = layoutService;
    this.players = [sampleName(), sampleName(), sampleName(), sampleName()];
  }

  activate() {
    this.layoutService.title = 'New game';
  }

}
