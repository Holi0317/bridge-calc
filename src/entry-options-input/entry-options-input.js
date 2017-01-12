import {inject, LogManager, bindable, bindingMode} from 'aurelia-framework';

const logger = LogManager.getLogger('EntryOptionsInputComponent');

@inject(Element)
export class EntryOptionsInput {
  el: HTMLElement;
  inputEl: ?HTMLInputElement;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: string;
  @bindable() error: string;
  @bindable() label: string;
  @bindable() type: string;

  constructor(el: HTMLElement) {
    this.el = el;
    this.inputEl = null;
  }

  attached() {
    this.inputEl = this.el.querySelector('input');
  }

  errorChanged(newValue: string, oldValue: string) {
    if (!this.inputEl) {
      return
    }
    this.inputEl.setCustomValidity(newValue);
  }
}
