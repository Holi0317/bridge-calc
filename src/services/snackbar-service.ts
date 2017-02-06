interface SnackbarDataWithoutAction {
  message: string;
  timeout?: number;
}

interface SnackbarDataWithAction extends SnackbarDataWithoutAction {
  actionHandler: (event: Event) => void;
  actionText: string;
}

export type SnackbarData = SnackbarDataWithAction | SnackbarDataWithoutAction;

export class SnackbarService {
  /**
   * Snackbar element injected into DOM.
   * Because MDL use some magic to upgrade element, it is not possible for TS to check it now.
   * The type should be HTMLElement
   * @type {any}
   * @private
   */
  private _snackbar: any | null = null;

  constructor() {

  }

  showSnackbar(data: SnackbarData) {
    if (!this._snackbar) {
      this._getSnackbar();
    }
    this._snackbar.MaterialSnackbar.showSnackbar(data);
  }

  private _getSnackbar() {
    this._snackbar = document.querySelector('.mdl-snackbar');
  }
}
