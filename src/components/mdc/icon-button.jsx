// @flow
import {h} from 'preact'
import MaterialComponent from 'preact-material-components/MaterialComponent'
import style from './icon-button.css'

export type IconButtonProps = {
  icon: React$Element<any>,
  onClick?: () => void
}

export class IconButton extends MaterialComponent {
  props: IconButtonProps
  control: HTMLElement
  static defaultProps = {
    ripple: true
  }

  componentDidMount() {
    this.attachRipple()
  }

  render() {
    const {onClick} = this.props
    const className = `mdc-ripple-surface ${style.iconButton}`
    return (
      <div ref={control => (this.control = control)} className={className} onClick={onClick}>
        {this.props.icon}
      </div>
    )
  }
}
