import {bindable, bindingMode, LogManager} from 'aurelia-framework';

const logger = LogManager.getLogger('CollapseComponent');

const openedClass = 'collapse-opened';

export class Collapse {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) open: boolean;
  contentElement: HTMLElement;
  buttonElement: HTMLButtonElement;

  constructor() {
    this.open = false;
    this.resizeListener = this.resizeListener.bind(this);
  }

  attached() {
    // Manually call changed as there was no element received before attached
    this.openChanged(this.open, null);

    window.addEventListener('resize', this.resizeListener);
  }

  detached() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener() {
    this.openChanged(this.open, null);
  }

  toggle() {
    this.open = !this.open;
  }

  openChanged(newValue: boolean, oldValue: boolean) {
    if (!this.contentElement) {
      return
    }
    if (newValue) {
      const height = this.contentElement.scrollHeight;
      this.contentElement.style.height = `${height}px`;
      this.buttonElement.classList.add(openedClass);
    } else {
      this.contentElement.style.height = '0';
      this.buttonElement.classList.remove(openedClass);
    }
  }
}
