import {autoinject, bindable, bindingMode, TaskQueue} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'

const logger = getLogger('MdlInputComponent')

@autoinject()
export class MdlInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: string
  @bindable() public error: string
  @bindable() public label: string
  @bindable() public type: string
  @bindable() public disabled = false
  private _inputEl: HTMLInputElement
  // _el type should be HTMLElement. MDL has extended it so TS cannot check its type.
  private _el: any

  constructor(private _taskQueue: TaskQueue) {

  }

  public errorChanged(newValue: string, oldValue: string) {
    if (!this._inputEl) {
      return
    }
    this._inputEl.setCustomValidity(newValue)
    this._updateClasses()
  }

  public disabledChanged() {
    this._updateClasses()
  }

  private _updateClasses() {
    this._taskQueue.queueMicroTask(() => {
      if (this._el && this._el.MaterialTextfield) {
        this._el.MaterialTextfield.updateClasses_()
      }
    })
  }
}
