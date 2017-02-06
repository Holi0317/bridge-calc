import {bindable, bindingMode} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';

const logger = getLogger('MdlInputComponent');

export class MdlInput {
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

    // Fire input event to force MDL to check validity
    const event = new Event('input', {bubbles: true});
    this._inputEl.dispatchEvent(event);
  }
}
