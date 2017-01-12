import {LogManager, bindable, bindingMode} from 'aurelia-framework';

const logger = LogManager.getLogger('EntryOptionsInputComponent');

export class EntryOptionsInput {
  inputEl: HTMLInputElement;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: string;
  @bindable() error: string;
  @bindable() label: string;
  @bindable() type: string;

  errorChanged(newValue: string, oldValue: string) {
    if (!this.inputEl) {
      return
    }
    this.inputEl.setCustomValidity(newValue);
  }
}
