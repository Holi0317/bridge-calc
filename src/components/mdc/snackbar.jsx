// @flow
import {h, Component} from 'preact'
import {MDCSnackbar} from '@material/snackbar'

export type SnackbarProps = {
  open: boolean,
  /**
   * Do NOT depend on this event. Just set open to false once this fires.
   */
  onClosed?: () => void,

  // Below are MDC snackbar options
  message: string,
  timeout?: ?number,
  actionHandler?: () => void,
  actionText?: ?string,
  multiline?: boolean,
  actionOnBottom?: boolean
}

export class Snackbar extends Component {
  props: SnackbarProps
  root: HTMLElement
  MDComponent: any

  componentDidMount() {
    this.MDComponent = MDCSnackbar.attachTo(this.root)
    this.root.addEventListener('transitionend', this.transitionEnd)
  }

  componentWillUnmount() {
    this.MDComponent.destroy && this.MDComponent.destroy()
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps: SnackbarProps) {
    if (this.MDComponent && nextProps.open && !this.props.open) {
      this.MDComponent.show(nextProps)
    }
  }

  transitionEnd = () => {
    const {onClosed} = this.props
    onClosed && onClosed()
  }

  render() {
    return <div
      className="mdc-snackbar"
      aria-live="assertive"
      aria-atomic="true"
      aria-hidden="true"
      ref={root => (this.root = root)}
    >
      <div className="mdc-snackbar__text" />
      <div className="mdc-snackbar__action-wrapper">
        <button
          type="button"
          className="mdc-button mdc-snackbar__action-button"
        />
      </div>
    </div>
  }
}
