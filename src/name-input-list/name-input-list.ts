import {autoinject, bindable, bindingMode} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import Sortable from 'sortablejs';
import {sampleName} from '../services/game-board/sample-name';
import {genID} from '../utils';

const logger = getLogger('NameInputListComponent');

function arrayMove(a: any[], from_: number, to: number) {
  a.splice(to, 0, a.splice(from_, 1)[0]);
}

interface SortableOnEndEvent extends Event {
  oldIndex: number;
  newIndex: number
}

@autoinject()
export class NameInputList {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public names: string[];
  @bindable() public showImport: boolean;
  private _addID = genID();
  private _importID = genID();
  private _sortable: Sortable | null = null;
  private _nameInputsElement: HTMLElement;

  constructor(private _el: Element) {

  }

  attached() {
    // TODO replace Sortable with other libraries that support mobile. Like desandro/draggabilly
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
