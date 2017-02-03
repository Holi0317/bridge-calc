import {bindable, bindingMode, inject} from 'aurelia-framework';

@inject(Element)
export class NameInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public name: string;

  constructor(private _el: HTMLElement) {

  }

  remove() {
    let e = new Event('remove', {bubbles: true});
    this._el.dispatchEvent(e);
  }

}
