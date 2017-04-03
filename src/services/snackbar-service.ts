interface ISnackbarDataWithoutAction {
  message: string
  timeout?: number
}

interface ISnackbarDataWithAction extends ISnackbarDataWithoutAction {
  actionHandler: (event: Event) => void
  actionText: string
}

export type SnackbarData = ISnackbarDataWithAction | ISnackbarDataWithoutAction

export class SnackbarService {
  /**
   * Snackbar element injected into DOM.
   * Because MDL use some magic to upgrade element, it is not possible for TS to check it now.
   * The type should be HTMLElement
   * @private
   */
  private _snackbar: any | null = null

  /**
   * Display a anackbar on UI.
   * See mdl documentation for parameters.
   * Short hand: If a string is passed in, an normal snackbar will be displayed.
   * @param data - Data to be displayed
   */
  public showSnackbar(data: SnackbarData | string) {
    if (!this._snackbar) {
      this._getSnackbar()
    }
    this._snackbar.MaterialSnackbar.showSnackbar(typeof data === 'string' ? {message: data} : data)
  }

  private _getSnackbar() {
    this._snackbar = document.querySelector('.mdl-snackbar')
  }
}
