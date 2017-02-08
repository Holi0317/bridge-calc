import {autoinject, bindable} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';

const logger = getLogger('ActionButtonComponent');

@autoinject()
export class ActionButtons {
  @bindable() undoDisabled: boolean;

  constructor(private _el: Element) {

  }

  next() {
    const event = new Event('next', {bubbles: true});
    this._el.dispatchEvent(event);
  }

  revert() {
    // We use delegate to bind event. Event will still be triggered even when the button is disabled.
    if (!this.undoDisabled) {
      const event = new Event('revert', {bubbles: true});
      this._el.dispatchEvent(event);
    }

  }
}
