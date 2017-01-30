import {bindable, bindingMode, inject} from 'aurelia-framework';

@inject(Element)
export class NameInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) name: string;
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el
  }

  remove() {
    let e = new Event('remove', {bubble: true});
    this.el.dispatchEvent(e);
  }

}
