import {inject, bindable, bindingMode, LogManager} from 'aurelia-framework';
import Sortable from 'sortablejs';
import {sampleName} from '../services/sample-name';

function arrayMove(a: any[], from_: number, to: number) {
  a.splice(to, 0, a.splice(from_, 1)[0]);
}

interface SortableOnEndEvent extends Event {
  oldIndex: number;
  newIndex: number
}

const logger = LogManager.getLogger('NameInputListComponent');

@inject(Element)
export class NameInputList {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public names: string[];
  @bindable() public showImport: boolean;
  private _sortable: Sortable | null = null;
  private _nameInputsElement: HTMLElement;

  constructor(private _el: HTMLElement) {

  }

  attached() {
    this._sortable = new Sortable(this._nameInputsElement, {
      handle: '.handle',
      onEnd: this.onMoveEnd.bind(this)
    });
    logger.debug('Sortable: ', this._sortable);
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
    let e = new Event('import', {bubbles: true});
    this._el.dispatchEvent(e);
  }
}
