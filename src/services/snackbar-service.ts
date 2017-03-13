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

  public showSnackbar(data: SnackbarData) {
    if (!this._snackbar) {
      this._getSnackbar()
    }
    this._snackbar.MaterialSnackbar.showSnackbar(data)
  }

  private _getSnackbar() {
    this._snackbar = document.querySelector('.mdl-snackbar')
  }
}
