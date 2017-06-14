// @flow
import {h, Component} from 'preact'
import {MDCTextfield} from '@material/textfield'
import {cssClasses} from '@material/textfield/constants'
import {genID} from '../../utils'
import style from './input.css'

export type InputProps = {
  value: string,
  type: string,
  label: string,
  fullWidth?: boolean,
  className?: string,
  disabled?: boolean,
  preFilled?: boolean,
  errorMsg?: string,
  onChange?: (newValue: ?string) => void,
  onKeyUp?: (newValue: ?string) => void
}

type InputState = {
  id: string,
  helpTextID: string
}

/**
 * Preact wrapper for MDC textfield component.
 * Textarea (Multi-line) mode is not supported.
 */
export class Input extends Component {
  props: InputProps
  state: InputState
  el: HTMLElement
  inputEl: HTMLInputElement

  constructor() {
    super(...arguments)
    this.state = {
      id: genID(),
      helpTextID: genID()
    }
  }

  componentDidMount() {
    MDCTextfield.attachTo(this.el)
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (nextProps.errorMsg !== this.props.errorMsg) {
      this.inputEl.setCustomValidity(nextProps.errorMsg || '')
    }
  }

  changeHandler = () => {
    const handler = this.props.onChange
    if (handler) {
      const el = this.inputEl
      handler(el ? el.value : null)
    }
  }

  keyUpHandler = () => {
    const handler = this.props.onKeyUp
    if (handler) {
      const el = this.inputEl
      handler(el ? el.value : null)
    }
  }

  _rootClass() {
    const {className, fullWidth} = this.props
    return `${className || ''} ${fullWidth ? style.fullWidth : ''}`
  }

  _containerClass() {
    const {disabled, preFilled, fullWidth} = this.props
    return `${cssClasses.ROOT} ${disabled ? cssClasses.DISABLED : ''} ${preFilled ? cssClasses.UPGRADED : ''} ${fullWidth ? style.fullWidth : ''}`
  }

  _labelClass() {
    const {preFilled} = this.props
    return `mdc-textfield__label ${preFilled ? cssClasses.LABEL_FLOAT_ABOVE : ''}`
  }

  _helpTextClass() {
    const baseClass = 'mdc-textfield-helptext'
    if (this.props.errorMsg) {
      return `${baseClass} ${cssClasses.HELPTEXT_PERSISTENT} ${cssClasses.HELPTEXT_VALIDATION_MSG}`
    }
    return baseClass
  }

  render() {
    const {id, helpTextID} = this.state
    const {value, type, label, errorMsg} = this.props
    return (
      <div className={this._rootClass()}>
        <div className={this._containerClass()} ref={ref => (this.el = ref)}>
          <input className="mdc-textfield__input" id={id}
            type={type} value={value} aria-controls={helpTextID}
            onChange={this.changeHandler} onKeyUp={this.keyUpHandler}
            ref={ref => (this.inputEl = ref)} />
          <label className={this._labelClass()} htmlFor={id}>
            {label}
          </label>
        </div>
        <p id={helpTextID} className={this._helpTextClass()}>
          {errorMsg}
        </p>
      </div>
    )
  }
}
