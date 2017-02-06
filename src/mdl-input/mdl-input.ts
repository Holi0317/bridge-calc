import {bindable, bindingMode, inject, TaskQueue} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';

const logger = getLogger('MdlInputComponent');

@inject(TaskQueue)
export class MdlInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: string;
  @bindable() public error: string;
  @bindable() public label: string;
  @bindable() public type: string;
  @bindable() public disabled = false;
  private _inputEl: HTMLInputElement;
  // _el type should be HTMLElement. MDL has extended it so TS cannot check its type.
  private _el: any;

  constructor(private _taskQueue: TaskQueue) {

  }

  errorChanged(newValue: string, oldValue: string) {
    if (!this._inputEl) {
      return
    }
    this._inputEl.setCustomValidity(newValue);
    this._taskQueue.queueMicroTask(() => {
      if (this._el.MaterialTextfield) {
        this._el.MaterialTextfield.updateClasses_();
      }
    })
  }

  disabledChanged() {
    this._taskQueue.queueMicroTask(() => {
      if (this._el && this._el.MaterialTextfield) {
        this._el.MaterialTextfield.checkDisabled();
      }
    });
  }
}
