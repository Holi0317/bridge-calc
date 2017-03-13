import {autoinject, bindable, bindingMode} from 'aurelia-framework'

@autoinject()
export class NameInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public name: string

  constructor(private _el: Element) {

  }

  public remove() {
    const e = new Event('remove', {bubbles: true})
    this._el.dispatchEvent(e)
  }

}
