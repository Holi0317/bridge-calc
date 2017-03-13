import {bindable, bindingMode} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'

const logger = getLogger('CollapseComponent')

const openedClass = 'collapse-opened'

export class Collapse {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public open = false
  private _contentElement: HTMLElement
  private _buttonElement: HTMLButtonElement

  constructor() {
    this.resizeListener = this.resizeListener.bind(this)
  }

  public attached() {
    // Manually call changed as there was no element received before attached
    this.openChanged(this.open)

    window.addEventListener('resize', this.resizeListener)
  }

  public detached() {
    window.removeEventListener('resize', this.resizeListener)
  }

  public resizeListener() {
    this.openChanged(this.open)
  }

  public toggle() {
    this.open = !this.open
  }

  public openChanged(newValue: boolean) {
    if (!this._contentElement) {
      return
    }
    if (newValue) {
      const height = this._contentElement.scrollHeight
      this._contentElement.style.height = `${height}px`
      this._buttonElement.classList.add(openedClass)
    } else {
      this._contentElement.style.height = '0'
      this._buttonElement.classList.remove(openedClass)
    }
  }
}
