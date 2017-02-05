import {bindable, bindingMode} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';

const logger = getLogger('EntryOptionsInputComponent');

export class EntryOptionsInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: string;
  @bindable() public error: string;
  @bindable() public label: string;
  @bindable() public type: string;
  private _inputEl: HTMLInputElement;

  errorChanged(newValue: string, oldValue: string) {
    if (!this._inputEl) {
      return
    }
    this._inputEl.setCustomValidity(newValue);
  }
}
