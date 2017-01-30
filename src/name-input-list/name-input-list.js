import {inject, bindable, bindingMode, LogManager} from 'aurelia-framework';
import Sortable from 'sortablejs';
import {sampleName} from '../services/sample-name';

function arrayMove(a: Array, from_: number, to: number) {
  a.splice(to, 0, a.splice(from_, 1)[0]);
}

interface SortableOnEndEvent extends Event {
  oldIndex: number;
  newIndex: number
}

const logger = LogManager.getLogger('NameInputListComponent');

@inject(Element)
export class NameInputList {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) names: string[];
  @bindable showImport: boolean;
  el: HTMLElement;
  sortable: Sortable;

  constructor(el: HTMLElement) {
    this.el = el;
    this.sortable = null;
  }

  attached() {
    this.sortable = new Sortable(this.el.querySelector('.name-inputs'), {
      handle: '.handle',
      onEnd: this.onMoveEnd.bind(this)
    });
    logger.debug('Sortable: ', this.sortable);
  }

  onMoveEnd(e: SortableOnEndEvent) {
    logger.debug(`Moving name item from ${e.oldIndex} to ${e.newIndex}`);
    arrayMove(this.names, e.oldIndex, e.newIndex);
  }

  add() {
    this.names.push(sampleName());
  }

  remove(nameIndex: number) {
    this.names.splice(nameIndex, 1);
  }

  importNames() {
    logger.debug('Firing import event');
    let e = new Event('import', {bubble: true});
    this.el.dispatchEvent(e);
  }
}
