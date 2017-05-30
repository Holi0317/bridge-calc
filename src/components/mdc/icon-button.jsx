// @flow
import {h} from 'preact'
import MaterialComponent from 'preact-material-components/MaterialComponent'

export type IconButtonProps = {
  icon: React$Element<any>
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
    return (
      <div ref={control => (this.control = control)} className="mdc-ripple-surface">
        {this.props.icon}
      </div>
    )
  }
}
